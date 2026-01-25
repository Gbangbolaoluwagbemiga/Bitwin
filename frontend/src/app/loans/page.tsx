'use client';

import { useState } from 'react';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function LoansPage() {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Loans</h1>
                    <p className="text-slate-400">Manage your borrowing and lending</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                    Request New Loan
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'active' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    Active Loans
                    {activeTab === 'active' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'history' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    History
                    {activeTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {activeTab === 'active' ? (
                    <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Active Loans</h3>
                        <p className="text-slate-400 max-w-md mx-auto mb-6">
                            You don't have any active loans. Start building your reputation by taking out a small loan.
                        </p>
                        <button className="text-blue-500 hover:text-blue-400 font-bold flex items-center justify-center gap-2 mx-auto">
                            Browse Loan Offers
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No History</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                            Your loan history will appear here once you complete a loan cycle.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
