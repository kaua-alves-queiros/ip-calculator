import { useState } from "react";
import { calculateSubnets } from "../utils/ip-calc";
import { ChevronDown, ChevronUp, Network } from "lucide-react";

interface SubnetTableProps {
    networkIp: string;
    currentCidr: number;
}

export function SubnetTable({ networkIp, currentCidr }: SubnetTableProps) {
    const [targetCidr, setTargetCidr] = useState(currentCidr + 1);
    const [isExpanded, setIsExpanded] = useState(false);

    const subnets = isExpanded && targetCidr > currentCidr
        ? calculateSubnets(networkIp, currentCidr, targetCidr)
        : [];

    if (currentCidr >= 32) return null;

    return (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Network className="h-5 w-5 text-purple-500" />
                    Subnetting / VLSM
                </h2>
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
            </div>

            {isExpanded && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                            Divide into subnets of size:
                        </label>
                        <select
                            value={targetCidr}
                            onChange={(e) => setTargetCidr(parseInt(e.target.value))}
                            className="h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-950"
                        >
                            {Array.from({ length: 32 - currentCidr }, (_, i) => {
                                const cidr = currentCidr + i + 1;
                                return (
                                    <option key={cidr} value={cidr}>
                                        /{cidr} ({Math.pow(2, 32 - cidr) - 2} hosts)
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50 dark:text-zinc-400">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Subnet Address</th>
                                    <th className="px-4 py-3">Range</th>
                                    <th className="px-4 py-3 rounded-r-lg">Broadcast</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {subnets.map((subnet, index) => (
                                    <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-4 py-3 font-mono font-medium text-zinc-900 dark:text-zinc-200">
                                            {subnet.network}/{targetCidr}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-zinc-600 dark:text-zinc-400">
                                            {subnet.range}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-zinc-600 dark:text-zinc-400">
                                            {subnet.broadcast}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {subnets.length === 0 && (
                            <p className="text-center text-zinc-500 py-8">
                                Select a smaller subnet mask to see the division.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
