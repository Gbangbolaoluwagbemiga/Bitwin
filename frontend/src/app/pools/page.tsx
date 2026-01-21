
'use client';

import { useState } from 'react';
import { TrendingUp, PiggyBank, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function PoolsPage() {
    const [activeTab, setActiveTab] = useState<'deposit' | 'borrow'>('deposit');
    const [amount, setAmount] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Liquidity Pools</h1>
                    <p className="text-slate-400">Earn yield or borrow instantly from automated pools</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Total Value Locked</div>
                        <div className="text-xl font-bold font-mono">1,245,678 STX</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Current APY</div>
                        <div className="text-xl font-bold font-mono text-green-400">5.2%</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Interaction Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="flex border-b border-slate-800">
                            <button
                                onClick={() => setActiveTab('deposit')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'deposit'
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                                    }`}
                            >
                                Deposit & Earn
                            </button>
                            <button
                                onClick={() => setActiveTab('borrow')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'borrow'
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                                    }`}
                            >
                                Borrow Instantly
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    {activeTab === 'deposit' ? 'Deposit Amount' : 'Borrow Amount'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-2xl font-mono text-white focus:outline-none focus:border-blue-500 transition-colors pl-4 pr-16"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                                        STX
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'deposit' ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                            <div className="text-sm text-slate-400 mb-1">Est. APY</div>
                                            <div className="text-xl font-bold text-green-400">5.2%</div>
                                        </div>
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                            <div className="text-sm text-slate-400 mb-1">Lock Period</div>
                                            <div className="text-xl font-bold">1 Day</div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <ArrowUpRight className="w-5 h-5" />
                                        Deposit STX
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                            <div className="text-sm text-slate-400 mb-1">Borrow APY</div>
                                            <div className="text-xl font-bold text-blue-400">6.5%</div>
                                        </div>
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                            <div className="text-sm text-slate-400 mb-1">Utilization</div>
                                            <div className="text-xl font-bold">45%</div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <ArrowDownLeft className="w-5 h-5" />
                                        Borrow STX
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            Pool Statistics
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                <span className="text-slate-400">Utilization Rate</span>
                                <span className="font-mono">45.2%</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                <span className="text-slate-400">Available Liquidity</span>
                                <span className="font-mono">683K STX</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                <span className="text-slate-400">Total Borrowed</span>
                                <span className="font-mono">562K STX</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                <span className="text-slate-400">Reserves</span>
                                <span className="font-mono">12K STX</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <PiggyBank className="w-5 h-5 text-blue-400" />
                            Your Position
                        </h3>
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center text-slate-400">
                            No active deposits
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
