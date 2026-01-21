'use client';

import { useState } from 'react';
import { Zap, AlertTriangle } from 'lucide-react';

export default function FlashLoansPage() {
    const [amount, setAmount] = useState('');
    const [targetContract, setTargetContract] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, this would use the wallet connection
    const handleExecute = async () => {
        setIsLoading(true);
        // Simulation of contract call
        setTimeout(() => {
            setIsLoading(false);
            alert('Flash loan initiated! Check wallet for signature.');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Flash Loans</h1>
                    <p className="text-slate-400">Borrow uncollateralized funds for one transaction</p>
                </div>
                <div className="bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-lg border border-yellow-500/20 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">0.09% Fee</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Execute Loan */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Execute Flash Loan</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">
                                Loan Amount (STX)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">
                                Target Contract
                            </label>
                            <input
                                type="text"
                                value={targetContract}
                                onChange={(e) => setTargetContract(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="SP..."
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Contract that implements flash-loan-receiver trait
                            </p>
                        </div>

                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Loan Fee (0.09%)</span>
                                <span>{amount ? (Number(amount) * 0.0009).toFixed(6) : '0.00'} STX</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800">
                                <span>Total Repayment</span>
                                <span>{amount ? (Number(amount) * 1.0009).toFixed(6) : '0.00'} STX</span>
                            </div>
                        </div>

                        <button
                            onClick={handleExecute}
                            disabled={isLoading || !amount || !targetContract}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Processing...' : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Execute Flash Loan
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Info/Stats */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">How it works</h2>
                        <div className="space-y-4 relative">
                            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800"></div>

                            <div className="relative pl-10">
                                <div className="absolute left-0 top-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold border border-slate-700">1</div>
                                <h3 className="font-bold">Borrow</h3>
                                <p className="text-slate-400 text-sm">Request STX from the pool for 0 collateral</p>
                            </div>

                            <div className="relative pl-10">
                                <div className="absolute left-0 top-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold border border-slate-700">2</div>
                                <h3 className="font-bold">Execute</h3>
                                <p className="text-slate-400 text-sm">Funds sent to your contract for immediate use</p>
                            </div>

                            <div className="relative pl-10">
                                <div className="absolute left-0 top-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold border border-slate-700">3</div>
                                <h3 className="font-bold">Repay</h3>
                                <p className="text-slate-400 text-sm">Return Loan + 0.09% fee in same transaction</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-500/10 p-3 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-yellow-500 mb-1">Developer Notice</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Flash loans require a smart contract that implements the
                                    <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-400 mx-1">flash-loan-receiver</code>
                                    trait. Do not try to execute to a standard wallet address.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
