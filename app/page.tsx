"use client";

import { useState, useEffect } from "react";
import { IpInput } from "./components/IpInput";
import { SubnetSelect } from "./components/SubnetSelect";
import { ResultCard } from "./components/ResultCard";
import { SubnetTable } from "./components/SubnetTable";
import {
  isValidIp,
  calculateNetwork,
  calculateBroadcast,
  calculateHostRange,
  calculateTotalHosts,
  getSubnetMask,
  ipToBinary,
} from "./utils/ip-calc";
import { Network, Radio, Users, Globe, Laptop, Binary } from "lucide-react";

export default function Home() {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState(24);
  const [error, setError] = useState("");
  const [results, setResults] = useState({
    network: "",
    broadcast: "",
    range: "",
    hosts: 0,
    mask: "",
    binary: "",
  });

  useEffect(() => {
    if (!isValidIp(ip)) {
      setError("Invalid IP address format");
      return;
    }
    setError("");

    const network = calculateNetwork(ip, cidr);
    const broadcast = calculateBroadcast(ip, cidr);
    const range = calculateHostRange(network, broadcast, cidr);
    const hosts = calculateTotalHosts(cidr);
    const mask = getSubnetMask(cidr);
    const binary = ipToBinary(ip);

    setResults({
      network,
      broadcast,
      range,
      hosts,
      mask,
      binary,
    });
  }, [ip, cidr]);

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  };

  const handleCidrChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCidr(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl -z-10" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl -z-10" />

      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 animate-in fade-in slide-in-from-bottom-4 duration-700">
            IP Subnet Calculator
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate network details, subnet masks, and host ranges with precision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Controls Section */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Laptop className="h-5 w-5 text-blue-500" />
                Configuration
              </h2>
              <div className="space-y-4">
                <IpInput
                  label="IP Address"
                  value={ip}
                  onChange={handleIpChange}
                  placeholder="e.g. 192.168.1.1"
                  error={!!error}
                  errorMessage={error}
                />
                <SubnetSelect
                  label="Subnet Mask (CIDR)"
                  value={cidr}
                  onChange={handleCidrChange}
                />
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/50 backdrop-blur-sm p-6 border border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/30">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                <Binary className="h-4 w-4" />
                Binary Representation
              </h3>
              <p className="font-mono text-xs text-blue-800 dark:text-blue-300 break-all">
                {results.binary || "..."}
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
            <ResultCard
              label="Network Address"
              value={results.network}
              icon={Network}
              subValue={`/${cidr}`}
            />
            <ResultCard
              label="Broadcast Address"
              value={results.broadcast}
              icon={Radio}
            />
            <ResultCard
              label="Subnet Mask"
              value={results.mask}
              icon={Globe}
            />
            <ResultCard
              label="Total Usable Hosts"
              value={results.hosts.toLocaleString()}
              icon={Users}
            />
            <div className="sm:col-span-2">
              <ResultCard
                label="Host Range"
                value={results.range}
                icon={Laptop}
              />
            </div>
          </div>
        </div>

        {/* Subnetting Section */}
        <SubnetTable networkIp={results.network} currentCidr={cidr} />
      </main>
    </div>
  );
}
