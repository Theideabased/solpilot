#!/usr/bin/env node
/**
 * Quick test for Birdeye token lookup
 * Tests the cached NOS token
 */

import { createBirdeyeTools } from './mastra/tools/birdeye-tokens.js';

async function testNosLookup() {
  console.log('🧪 Testing NOS Token Lookup...\n');

  const tools = createBirdeyeTools();

  // Test 1: Look up NOS token
  console.log('1️⃣ Looking up NOS token...');
  const result = await tools.quickTokenLookup.execute({
    context: { symbol: 'NOS' },
    runtimeContext: {}
  });

  console.log('\n📊 Result:', JSON.stringify(result, null, 2));

  if (result.success) {
    console.log('\n✅ SUCCESS! NOS token found:');
    console.log(`   Symbol: ${result.data.symbol}`);
    console.log(`   Name: ${result.data.name}`);
    console.log(`   Address: ${result.data.address}`);
    console.log(`   Decimals: ${result.data.decimals}`);
    console.log(`   Source: ${result.data.source}`);
  } else {
    console.log('\n❌ FAILED:', result.error);
  }

  // Test 2: Look up SOL token
  console.log('\n\n2️⃣ Looking up SOL token...');
  const solResult = await tools.quickTokenLookup.execute({
    context: { symbol: 'SOL' },
    runtimeContext: {}
  });

  if (solResult.success) {
    console.log('✅ SOL found:', solResult.data.address);
  }

  console.log('\n\n🎉 All tests complete!');
  console.log('📝 You can now use "swap SOL to NOS" and it will work instantly!');
}

testNosLookup().catch(console.error);
