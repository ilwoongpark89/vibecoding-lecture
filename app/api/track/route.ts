import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
    try {
        if (!process.env.UPSTASH_REDIS_REST_URL) {
            return NextResponse.json({ success: false, error: 'Redis not configured' });
        }

        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        let location = { country: 'Unknown', city: 'Unknown', region: 'Unknown' };

        try {
            const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`);
            const geoData = await geoResponse.json();
            if (geoData.status === 'success') {
                location = {
                    country: geoData.country || 'Unknown',
                    city: geoData.city || 'Unknown',
                    region: geoData.regionName || 'Unknown'
                };
            }
        } catch {
            // Geolocation failed
        }

        const visit = {
            ip: ip.substring(0, 10) + '***',
            country: location.country,
            city: location.city,
            region: location.region,
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent')?.substring(0, 100) || 'Unknown'
        };

        const today = new Date().toISOString().split('T')[0];

        await redis.incr('vibecoding:total_visits');
        await redis.incr(`vibecoding:daily:${today}`);
        await redis.hincrby('vibecoding:countries', location.country, 1);
        await redis.lpush('vibecoding:recent_visits', JSON.stringify(visit));
        await redis.ltrim('vibecoding:recent_visits', 0, 99);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
