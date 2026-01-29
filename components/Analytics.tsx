"use client";

import { useEffect } from 'react';

export default function Analytics() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                await fetch('/api/track', { method: 'POST' });
            } catch (error) {
                console.error('Failed to track visit:', error);
            }
        };

        if (!sessionStorage.getItem('vibecoding_tracked')) {
            trackVisit();
            sessionStorage.setItem('vibecoding_tracked', 'true');
        }
    }, []);

    return null;
}
