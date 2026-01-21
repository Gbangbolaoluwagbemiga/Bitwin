
'use client';

import { useState } from 'react';
import { ShieldCheck, UserPlus, Clock } from 'lucide-react';

export default function DelegationPage() {
    const [delegateAddress, setDelegateAddress] = useState('');
    const [creditLimit, setCreditLimit] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Credit Delegation</h1>
                    <p className="text-slate-400">Lend your reputation and credit line to people you trust</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Delegation */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-400" />
                        New Delegation
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">
                                Delegatee Address
                            </label>
                            <input
                                type="text"
                                value={delegateAddress}
                                onChange={(e) => setDelegateAddress(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
                                placeholder="SP..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">
                                    Credit Limit (STX)
                                </label>
                                <input
                                    type="number"
                                    value={creditLimit}
                                    onChange={(e) => setCreditLimit(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">
                                    Duration (Blocks)
                                </label>
                                <input
                                    type="number"
                                    defaultValue={144}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">
                                Delegation Fee (%)
                            </label>
                            <div className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-500">
                                1.0% (Platform Standard)
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Delegate Credit
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold mb-4">Your Trust Score</h3>
                        <div className="flex items-center justify-center p-8 bg-slate-950 rounded-full w-40 h-40 mx-auto border-4 border-blue-500/20 mb-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                                    850
                                </div>
                                <div className="text-xs text-slate-500">EXCELLENT</div>
                            </div>
                        </div>
                        <div className="text-center text-sm text-slate-400">
                            You can delegate up to <span className="text-white font-bold">5,000 STX</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold mb-4">Active Delegations</h3>
                        <div className="space-y-4">
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                                <div>
                                    <div className="text-sm font-mono text-slate-300">SP2...9F2</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Ends in 140 blks
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">500 STX</div>
                                    <div className="text-xs text-green-500">Active</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-4 text-sm text-slate-400 hover:text-white transition-colors">
                            View All History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
