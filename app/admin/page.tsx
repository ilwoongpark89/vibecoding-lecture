"use client";

import { useState, useEffect, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

interface AnalyticsData {
    totalVisits: number;
    periodTotal: number;
    countries: Record<string, number>;
    allCountries: Record<string, number>;
    recentVisits: Array<{
        ip: string;
        country: string;
        city: string;
        region: string;
        timestamp: string;
        userAgent: string;
    }>;
    dailyStats: Record<string, number>;
    period: number;
}

const COLORS = ['#7c3aed', '#e11d48', '#2563eb', '#059669', '#d97706', '#dc2626', '#4f46e5', '#0891b2'];

export default function AdminDashboard() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = useState(7);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const regionRef = useRef<HTMLDivElement>(null);

    const fetchAnalytics = async (pwd: string, days: number = 7) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/analytics?period=${days}`, {
                headers: { 'x-admin-password': pwd }
            });
            if (response.status === 401) {
                setError('비밀번호가 틀렸습니다');
                setIsAuthenticated(false);
                return;
            }
            const result = await response.json();
            setData(result);
            setIsAuthenticated(true);
            localStorage.setItem('vibecoding_admin_pwd', pwd);
        } catch {
            setError('데이터를 불러오는데 실패했습니다');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedPwd = localStorage.getItem('vibecoding_admin_pwd');
        if (storedPwd) {
            setPassword(storedPwd);
            fetchAnalytics(storedPwd, period);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAnalytics(password, period);
    };

    const handleLogout = () => {
        localStorage.removeItem('vibecoding_admin_pwd');
        setIsAuthenticated(false);
        setPassword('');
        setData(null);
    };

    const handlePeriodChange = (days: number) => {
        setPeriod(days);
        fetchAnalytics(password, days);
    };

    const handleCountryClick = (country: string) => {
        if (selectedCountry === country) {
            setSelectedCountry(null);
        } else {
            setSelectedCountry(country);
            setTimeout(() => regionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-700">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Dashboard</h1>
                    <p className="text-gray-500 text-center text-sm mb-6">바이브코딩 기초 — 접속자 분석</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all disabled:opacity-50"
                        >
                            {loading ? '로딩 중...' : '로그인'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const chartData = data?.dailyStats
        ? Object.entries(data.dailyStats)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, count]) => ({ date: date.slice(5), visits: count }))
        : [];

    const countryData = data?.countries
        ? Object.entries(data.countries)
            .sort((a, b) => Number(b[1]) - Number(a[1]))
            .slice(0, 8)
            .map(([country, count]) => ({ name: country, value: Number(count) }))
        : [];

    const sortedCountries = data?.countries
        ? Object.entries(data.countries).sort((a, b) => Number(b[1]) - Number(a[1]))
        : [];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <h1 className="text-lg font-bold text-slate-900">바이브코딩 Admin</h1>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">Analytics</span>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Period & Refresh */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                        <div className="flex gap-2 flex-wrap">
                            {[1, 7, 30].map(d => (
                                <button
                                    key={d}
                                    onClick={() => handlePeriodChange(d)}
                                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                                        period === d ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {d === 1 ? '1 Day' : `${d} Days`}
                                </button>
                            ))}
                            <button
                                onClick={() => fetchAnalytics(password, period)}
                                className="px-4 py-2 text-sm rounded-lg font-medium bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 transition-all"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Visits (All Time)', value: data?.totalVisits || 0, color: 'text-violet-600' },
                            { label: period === 1 ? 'Today' : `Last ${period} Days`, value: data?.periodTotal || 0, color: 'text-indigo-600' },
                            { label: 'Countries', value: sortedCountries.length, color: 'text-emerald-600' },
                            { label: 'Today', value: data?.dailyStats?.[new Date().toISOString().split('T')[0]] || 0, color: 'text-amber-600' },
                        ].map(card => (
                            <div key={card.label} className="bg-white rounded-xl p-5 border border-slate-200">
                                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                                <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">Daily Visitors</h3>
                            <div className="h-[300px]">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" fontSize={12} tickLine={false} />
                                            <YAxis fontSize={12} tickLine={false} allowDecimals={false} />
                                            <Tooltip />
                                            <Bar dataKey="visits" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">Visitors by Country</h3>
                            <div className="h-[300px]">
                                {countryData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={countryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {countryData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Country List & Recent Visits */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">
                                Visitors by Country ({period === 1 ? 'Today' : `Last ${period} Days`})
                            </h3>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                                {sortedCountries.map(([country, count]) => (
                                    <div
                                        key={country}
                                        className={`flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedCountry === country ? 'bg-violet-50' : 'hover:bg-gray-50'
                                        }`}
                                        onClick={() => handleCountryClick(country)}
                                    >
                                        <span className={selectedCountry === country ? 'text-violet-700 font-medium' : 'text-gray-600'}>{country}</span>
                                        <span className="font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">{count}</span>
                                    </div>
                                ))}
                                {sortedCountries.length === 0 && <p className="text-gray-400 text-center py-4">No data yet</p>}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">
                                Recent Visits ({period === 1 ? 'Today' : `Last ${period} Days`})
                            </h3>
                            <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-white">
                                        <tr className="border-b">
                                            <th className="text-left py-2 px-2 text-gray-500 font-medium">Time</th>
                                            <th className="text-left py-2 px-2 text-gray-500 font-medium">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.recentVisits?.map((visit, i) => (
                                            <tr key={i} className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-2 text-gray-600 whitespace-nowrap">
                                                    {new Date(visit.timestamp).toLocaleString('ko-KR', {
                                                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="py-2 px-2">
                                                    <span className="font-medium">{visit.country}</span>
                                                    {visit.city !== 'Unknown' && <span className="text-gray-400 ml-1">, {visit.city}</span>}
                                                </td>
                                            </tr>
                                        ))}
                                        {(!data?.recentVisits || data.recentVisits.length === 0) && (
                                            <tr><td colSpan={2} className="py-4 text-center text-gray-400">No visits recorded yet</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Region Breakdown */}
                    {selectedCountry && (
                        <div ref={regionRef} className="mt-8">
                            <div className="bg-white rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-900">Visitors by Region — {selectedCountry}</h3>
                                    <button onClick={() => setSelectedCountry(null)} className="px-3 py-1 text-sm border border-slate-300 rounded-lg hover:bg-slate-50">
                                        Close
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {(() => {
                                            const regionCounts: Record<string, { count: number; cities: Record<string, number> }> = {};
                                            data?.recentVisits?.filter(v => v.country === selectedCountry).forEach(visit => {
                                                const region = visit.region || 'Unknown';
                                                const city = visit.city || 'Unknown';
                                                if (!regionCounts[region]) regionCounts[region] = { count: 0, cities: {} };
                                                regionCounts[region].count++;
                                                regionCounts[region].cities[city] = (regionCounts[region].cities[city] || 0) + 1;
                                            });
                                            const sorted = Object.entries(regionCounts).sort((a, b) => b[1].count - a[1].count);
                                            if (sorted.length === 0) return <p className="text-gray-400 text-center py-4">No region data</p>;
                                            return sorted.map(([region, rd]) => (
                                                <div key={region} className="border-b last:border-0 pb-2">
                                                    <div className="flex justify-between items-center py-1">
                                                        <span className="font-medium text-gray-700">{region}</span>
                                                        <span className="font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{rd.count}</span>
                                                    </div>
                                                    <div className="pl-4 space-y-1">
                                                        {Object.entries(rd.cities).sort((a, b) => b[1] - a[1]).map(([city, count]) => (
                                                            <div key={city} className="flex justify-between text-sm">
                                                                <span className="text-gray-500">{city}</span>
                                                                <span className="text-gray-400">{count}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                    <div className="h-[250px]">
                                        {(() => {
                                            const rc: Record<string, number> = {};
                                            data?.recentVisits?.filter(v => v.country === selectedCountry).forEach(v => {
                                                rc[v.region || 'Unknown'] = (rc[v.region || 'Unknown'] || 0) + 1;
                                            });
                                            const rd = Object.entries(rc).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, value]) => ({ name, value }));
                                            if (rd.length === 0) return <div className="h-full flex items-center justify-center text-gray-400">No data</div>;
                                            return (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={rd} cx="50%" cy="50%" labelLine={false}
                                                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                                            outerRadius={80} fill="#8884d8" dataKey="value">
                                                            {rd.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
