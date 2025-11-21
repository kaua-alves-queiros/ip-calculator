import { LucideIcon } from 'lucide-react';

interface ResultCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    subValue?: string;
}

export function ResultCard({ label, value, icon: Icon, subValue }: ResultCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
                        {value}
                    </h3>
                    {subValue && (
                        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                            {subValue}
                        </p>
                    )}
                </div>
                <div className="rounded-lg bg-zinc-100 p-2 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}
