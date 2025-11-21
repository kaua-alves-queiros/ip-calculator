import {
    isValidIp,
    calculateNetwork,
    calculateBroadcast,
    calculateHostRange,
    calculateTotalHosts,
    getSubnetMask,
} from "./ip-calc";

function runTests() {
    console.log("Running IP Calculation Tests...\n");

    const testCases = [
        {
            ip: "192.168.1.10",
            cidr: 24,
            expected: {
                network: "192.168.1.0",
                broadcast: "192.168.1.255",
                hosts: 254,
                mask: "255.255.255.0",
            },
        },
        {
            ip: "10.0.0.5",
            cidr: 8,
            expected: {
                network: "10.0.0.0",
                broadcast: "10.255.255.255",
                hosts: 16777214,
                mask: "255.0.0.0",
            },
        },
        {
            ip: "172.16.0.1",
            cidr: 30,
            expected: {
                network: "172.16.0.0",
                broadcast: "172.16.0.3",
                hosts: 2,
                mask: "255.255.255.252",
            },
        },
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        console.log(`Test Case ${index + 1}: ${test.ip}/${test.cidr}`);

        const network = calculateNetwork(test.ip, test.cidr);
        const broadcast = calculateBroadcast(test.ip, test.cidr);
        const hosts = calculateTotalHosts(test.cidr);
        const mask = getSubnetMask(test.cidr);

        let casePassed = true;

        if (network !== test.expected.network) {
            console.error(`  ❌ Network Mismatch: Expected ${test.expected.network}, got ${network}`);
            casePassed = false;
        }
        if (broadcast !== test.expected.broadcast) {
            console.error(`  ❌ Broadcast Mismatch: Expected ${test.expected.broadcast}, got ${broadcast}`);
            casePassed = false;
        }
        if (hosts !== test.expected.hosts) {
            console.error(`  ❌ Hosts Mismatch: Expected ${test.expected.hosts}, got ${hosts}`);
            casePassed = false;
        }
        if (mask !== test.expected.mask) {
            console.error(`  ❌ Mask Mismatch: Expected ${test.expected.mask}, got ${mask}`);
            casePassed = false;
        }

        if (casePassed) {
            console.log("  ✅ Passed");
            passed++;
        } else {
            failed++;
        }
        console.log("");
    });

    console.log(`Results: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
}

runTests();
