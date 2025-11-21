import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SubnetSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export function SubnetSelect({ className, label, ...props }: SubnetSelectProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={twMerge(
                        clsx(
                            "flex h-10 w-full appearance-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:text-zinc-50 dark:focus-visible:ring-zinc-300",
                            className
                        )
                    )}
                    {...props}
                >
                    {Array.from({ length: 33 }, (_, i) => (
                        <option key={i} value={i}>
                            /{i}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
