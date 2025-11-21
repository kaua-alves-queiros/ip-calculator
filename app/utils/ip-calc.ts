
export function isValidIp(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
  });
}

export function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ].join('.');
}

export function ipToBinary(ip: string): string {
  return ip.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('.');
}

export function calculateNetwork(ip: string, cidr: number): string {
  const ipLong = ipToLong(ip);
  const mask = ~((1 << (32 - cidr)) - 1);
  return longToIp(ipLong & mask);
}

export function calculateBroadcast(ip: string, cidr: number): string {
  const ipLong = ipToLong(ip);
  const mask = ~((1 << (32 - cidr)) - 1);
  return longToIp(ipLong | ~mask);
}

export function calculateTotalHosts(cidr: number): number {
  if (cidr === 32) return 1; // Special case for /32
  if (cidr === 31) return 2; // Special case for /31 (point-to-point)
  return Math.pow(2, 32 - cidr) - 2;
}

export function calculateHostRange(network: string, broadcast: string, cidr: number): string {
  if (cidr === 32) return network;
  if (cidr === 31) return `${network} - ${broadcast}`;

  const netLong = ipToLong(network);
  const broadLong = ipToLong(broadcast);

  return `${longToIp(netLong + 1)} - ${longToIp(broadLong - 1)}`;
}

export function calculateSubnets(networkIp: string, currentCidr: number, targetCidr: number): Array<{ network: string; range: string; broadcast: string }> {
  if (targetCidr <= currentCidr || targetCidr > 32) return [];

  const subnets = [];
  const numSubnets = Math.pow(2, targetCidr - currentCidr);
  const increment = Math.pow(2, 32 - targetCidr);
  let currentLong = ipToLong(networkIp) & ~((1 << (32 - currentCidr)) - 1); // Ensure we start at network address

  for (let i = 0; i < numSubnets; i++) {
    // Cap at 256 subnets to prevent performance issues/UI clutter
    if (i >= 256) break;

    const netIp = longToIp(currentLong);
    const broadIp = calculateBroadcast(netIp, targetCidr);
    const range = calculateHostRange(netIp, broadIp, targetCidr);

    subnets.push({
      network: netIp,
      range: range,
      broadcast: broadIp
    });

    currentLong += increment;
  }

  return subnets;
}

export function getSubnetMask(cidr: number): string {
  const mask = ~((1 << (32 - cidr)) - 1);
  return longToIp(mask);
}
