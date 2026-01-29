import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ADMIN_PASSWORD = process.env.ANALYTICS_PASSWORD || 'vibecoding2026admin';

export async function GET(request: NextRequest) {
    const password = request.headers.get('x-admin-password');
    if (password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.UPSTASH_REDIS_REST_URL) {
        return NextResponse.json({
            error: 'Redis not configured',
            totalVisits: 0,
            countries: {},
            recentVisits: [],
            dailyStats: {}
        });
    }

    const { searchParams } = new URL(request.url);
    const period = parseInt(searchParams.get('period') || '7');

    try {
        const totalVisits = await redis.get('vibecoding:total_visits') || 0;
        const countries = await redis.hgetall('vibecoding:countries') || {};

        const recentVisits = await redis.lrange('vibecoding:recent_visits', 0, 99) || [];
        const parsedVisits = recentVisits.map((v: string | object) => {
            if (typeof v === 'string') {
                try { return JSON.parse(v); } catch { return v; }
            }
            return v;
        });

        const periodStart = new Date();
        periodStart.setDate(periodStart.getDate() - period);
        periodStart.setHours(0, 0, 0, 0);

        const filteredVisits = parsedVisits.filter((visit: { timestamp?: string }) => {
            if (!visit.timestamp) return false;
            return new Date(visit.timestamp) >= periodStart;
        });

        const periodCountries: Record<string, number> = {};
        filteredVisits.forEach((visit: { country?: string }) => {
            if (visit.country) {
                periodCountries[visit.country] = (periodCountries[visit.country] || 0) + 1;
            }
        });

        const dailyStats: Record<string, number> = {};
        for (let i = 0; i < period; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const count = await redis.get(`vibecoding:daily:${dateStr}`) || 0;
            dailyStats[dateStr] = Number(count);
        }

        const periodTotal = Object.values(dailyStats).reduce((sum, count) => sum + count, 0);

        return NextResponse.json({
            totalVisits: Number(totalVisits),
            periodTotal,
            countries: periodCountries,
            allCountries: countries,
            recentVisits: filteredVisits,
            dailyStats,
            period
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
