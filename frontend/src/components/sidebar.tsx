
import Link from 'next/link';
import { LayoutDashboard, Zap, Droplets, Image as ImageIcon, Users, Shield } from 'lucide-react';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Flash Loans', href: '/flash-loans', icon: Zap },
    { name: 'Liquidity Pools', href: '/pools', icon: Droplets },
    { name: 'NFT Verification', href: '/nft', icon: ImageIcon },
    { name: 'Credit Delegation', href: '/delegation', icon: Users },
    { name: 'Governance', href: '/governance', icon: Shield },
];

export function Sidebar() {
    return (
        <div className="w-64 bg-slate-950 border-r border-slate-800 h-screen p-4 flex flex-col fixed left-0 top-0">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    BitTrust
                </span>
            </div>

            <nav className="space-y-1 flex-1">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors group"
                    >
                        <item.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-800">
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-slate-400">Mainnet Connected</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono truncate">
                        SP2Q...db204fdb
                    </div>
                </div>
            </div>
        </div>
    );
}
