import { DollarSign, Activity, Users, Layers } from 'lucide-react';

const stats = [
    {
        name: 'Total Value Locked',
        value: '$12,345,678',
        change: '+12.5%',
        icon: DollarSign,
    },
    {
        name: 'Active Loans',
        value: '1,234',
        change: '+5.2%',
        icon: Activity,
    },
    {
        name: 'Total Users',
        value: '45.2k',
        change: '+18.2%',
        icon: Users,
    },
    {
        name: 'Protocol Revenue',
        value: '$89,234',
        change: '+4.3%',
        icon: Layers,
    },
];

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.name} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <span className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-full">
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
