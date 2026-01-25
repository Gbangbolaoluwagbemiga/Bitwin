import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from 'lucide-react';

const activities = [
    {
        id: 1,
        type: 'Loan Repayment',
        amount: '500 STX',
        user: 'SP2Q...db20',
        time: '2 mins ago',
        icon: ArrowUpRight,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
    },
    {
        id: 2,
        type: 'New Loan',
        amount: '1,000 STX',
        user: 'SP3X...ab12',
        time: '5 mins ago',
        icon: ArrowDownLeft,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        id: 3,
        type: 'Flash Loan',
        amount: '50,000 STX',
        user: 'SP1Y...cd34',
        time: '12 mins ago',
        icon: RefreshCcw,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
    {
        id: 4,
        type: 'Liquidity Added',
        amount: '2,500 STX',
        user: 'SP4Z...ef56',
        time: '18 mins ago',
        icon: ArrowDownLeft,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
    },
    {
        id: 5,
        type: 'Loan Defaulted',
        amount: '150 STX',
        user: 'SP9A...gh78',
        time: '1 hour ago',
        icon: ArrowUpRight,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
    },
];

export function RecentActivity() {
    return (
        <div className="bg-card border border-border rounded-xl p-6 h-full">
            <h2 className="text-xl font-bold mb-6 text-foreground">Recent Activity</h2>
            <div className="space-y-6">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-lg -mx-2 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center ${activity.color}`}>
                                <activity.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                    {activity.type}
                                </h4>
                                <p className="text-sm text-muted-foreground">{activity.user}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono font-bold text-foreground">{activity.amount}</div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
