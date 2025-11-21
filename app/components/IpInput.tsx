import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface IpInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    errorMessage?: string;
}

export function IpInput({ className, label, error, errorMessage, ...props }: IpInputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                </label>
            )}
            <input
                type="text"
                className={twMerge(
                    clsx(
                        "flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
                        error && "border-red-500 focus-visible:ring-red-500 dark:border-red-900 dark:focus-visible:ring-red-900",
                        className
                    )
                )}
                {...props}
            />
            {error && errorMessage && (
                <span className="text-xs text-red-500 dark:text-red-400">{errorMessage}</span>
            )}
        </div>
    );
}
