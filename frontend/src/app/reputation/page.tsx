'use client';

import { Shield, TrendingUp, Award, AlertCircle } from 'lucide-react';

export default function ReputationPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Reputation</h1>
                    <p className="text-slate-400">Your on-chain credit score and history</p>
                </div>
                <div className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-lg border border-blue-500/20 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-bold">Score: 500</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
                    <h2 className="text-xl font-bold mb-6">Credit Score Analysis</h2>
                    <div className="flex items-center gap-8">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            {/* Simple circular progress visualization */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-slate-800"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - 500 / 1000)}
                                    className="text-blue-500"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-bold text-white">500</span>
                                <span className="text-slate-400 text-sm">Neutral</span>
                            </div>
                        </div>
                        <div className="space-y-4 flex-1">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Borrowing Limit</span>
                                <span className="font-bold">1,000 STX</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Interest Rate Discount</span>
                                <span className="font-bold">0%</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-4">
                                Increase your score by repaying loans on time and maintaining a healthy collateral ratio.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            History
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Total Loans</span>
                                <span className="font-bold">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Repaid</span>
                                <span className="font-bold text-green-500">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Defaulted</span>
                                <span className="font-bold text-red-500">0</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Badges
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-500">Newcomer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
