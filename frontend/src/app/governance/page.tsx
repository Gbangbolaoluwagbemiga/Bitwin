'use client';

import { useState } from 'react';
import { Vote, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';

export default function GovernancePage() {
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Governance</h1>
                    <p className="text-slate-400">Participate in protocol decisions</p>
                </div>
                 <div className="bg-purple-500/10 text-purple-500 px-4 py-2 rounded-lg border border-purple-500/20 flex items-center gap-2">
                    <Vote className="w-5 h-5" />
                    <span className="font-bold">Voting Power: 0 BTRST</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                     <h2 className="text-xl font-bold">Active Proposals</h2>
                     {/* Dummy Proposal 1 */}
                     <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                     <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full font-bold">Active</span>
                                     <span className="text-slate-500 text-sm">#BIP-12</span>
                                </div>
                                <h3 className="text-lg font-bold">Adjust Collateral Ratio for STX Loans</h3>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-400">Ends in</div>
                                <div className="font-mono font-bold">2 days</div>
                            </div>
                        </div>
                        <p className="text-slate-400 mb-6">
                            Proposal to decrease the minimum collateral ratio for STX-backed loans from 150% to 140% to increase borrowing efficiency.
                        </p>
                        
                        <div className="space-y-3 mb-6">
                             <div className="flex justify-between text-sm mb-1">
                                <span>For</span>
                                <span>65%</span>
                             </div>
                             <div className="w-full bg-slate-800 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                             </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-slate-800 hover:bg-green-900/30 border border-slate-700 hover:border-green-500/50 text-white py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                                <ThumbsUp className="w-4 h-4 text-green-500" />
                                Vote For
                            </button>
                            <button className="flex-1 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-500/50 text-white py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                                <ThumbsDown className="w-4 h-4 text-red-500" />
                                Vote Against
                            </button>
                        </div>
                     </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Your Stats</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg">
                                <span className="text-slate-400">Delegated Power</span>
                                <span className="font-mono font-bold">0</span>
                            </div>
                             <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg">
                                <span className="text-slate-400">Proposals Voted</span>
                                <span className="font-mono font-bold">0</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}
