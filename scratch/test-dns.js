import dns from 'dns';
import { promisify } from 'util';

const resolveSrv = promisify(dns.resolveSrv);

async function test(label, configureDns) {
  if (configureDns) {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } else {
    // Reset to default DNS servers by passing empty array (or resetting node default)
    // Node doesn't have an easy reset, but we can restart the process or run without it.
  }
  
  const start = Date.now();
  try {
    console.log(`[${label}] Resolving SRV for _mongodb._tcp.langchain.frasihf.mongodb.net...`);
    const records = await resolveSrv('_mongodb._tcp.langchain.frasihf.mongodb.net');
    console.log(`[${label}] Success in ${Date.now() - start}ms: found ${records.length} records.`);
  } catch (err) {
    console.error(`[${label}] Failed in ${Date.now() - start}ms: ${err.message}`);
  }
}

async function main() {
  // Test default first (in a separate run or by not setting it)
  await test('Default Resolver', false);
  
  // Test with Google DNS
  await test('Google DNS Resolver', true);
}

main();
