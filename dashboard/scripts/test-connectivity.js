// ConnectX - Connectivity Test for Wizard Integration
const { neon } = require('@neondatabase/serverless');

async function testConnectivity() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║              CONNECTX - Connectivity Test                 ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log('║  Testing: Wizard Integration                              ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment');
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);
  let allPassed = true;

  // Test 1: Database Connectivity
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ TEST 1: Database Connectivity                            │');
  console.log('└─────────────────────────────────────────────────────────┘');
  try {
    const start = Date.now();
    await sql`SELECT 1 as test`;
    const latency = Date.now() - start;
    console.log(`✅ Database: Connected (${latency}ms latency)\n`);
  } catch (error) {
    console.error(`❌ Database: Connection failed - ${error.message}\n`);
    allPassed = false;
  }

  // Test 2: Table Exists
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ TEST 2: Wizard Table Exists                              │');
  console.log('└─────────────────────────────────────────────────────────┘');
  try {
    const result = await sql`
      SELECT table_name,
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'ancarraig_ai_wizard_responses') as column_count
      FROM information_schema.tables
      WHERE table_name = 'ancarraig_ai_wizard_responses'
    `;

    if (result.length > 0) {
      console.log(`✅ Table: ancarraig_ai_wizard_responses exists`);
      console.log(`✅ Columns: ${result[0].column_count} columns defined\n`);
    } else {
      console.error('❌ Table: ancarraig_ai_wizard_responses NOT FOUND\n');
      allPassed = false;
    }
  } catch (error) {
    console.error(`❌ Table Check Failed: ${error.message}\n`);
    allPassed = false;
  }

  // Test 3: Table Structure
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ TEST 3: Table Schema Validation                          │');
  console.log('└─────────────────────────────────────────────────────────┘');
  try {
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'ancarraig_ai_wizard_responses'
      ORDER BY ordinal_position
    `;

    const requiredColumns = [
      'id', 'user_id', 'property_name', 'property_type',
      'primary_goal', 'biggest_challenge', 'main_channels'
    ];

    const existingColumns = columns.map(c => c.column_name);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    if (missingColumns.length === 0) {
      console.log(`✅ Schema: All ${requiredColumns.length} required columns present`);
      console.log(`✅ Total Columns: ${columns.length}\n`);
    } else {
      console.error(`❌ Schema: Missing columns: ${missingColumns.join(', ')}\n`);
      allPassed = false;
    }
  } catch (error) {
    console.error(`❌ Schema Check Failed: ${error.message}\n`);
    allPassed = false;
  }

  // Test 4: Indexes
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ TEST 4: Index Validation                                 │');
  console.log('└─────────────────────────────────────────────────────────┘');
  try {
    const indexes = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename = 'ancarraig_ai_wizard_responses'
    `;

    if (indexes.length >= 2) {
      console.log(`✅ Indexes: ${indexes.length} indexes created`);
      indexes.forEach(idx => {
        console.log(`   - ${idx.indexname}`);
      });
      console.log('');
    } else {
      console.error(`❌ Indexes: Expected 2+, found ${indexes.length}\n`);
      allPassed = false;
    }
  } catch (error) {
    console.error(`❌ Index Check Failed: ${error.message}\n`);
    allPassed = false;
  }

  // Test 5: Write Test
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ TEST 5: Write Operation Test                             │');
  console.log('└─────────────────────────────────────────────────────────┘');
  try {
    const testUserId = '00000000-0000-0000-0000-000000000099';

    // Clean up any test data first
    await sql`DELETE FROM ancarraig_ai_wizard_responses WHERE user_id = ${testUserId}`;

    // Insert test record
    await sql`
      INSERT INTO ancarraig_ai_wizard_responses (
        user_id, property_name, property_type, primary_goal,
        biggest_challenge, main_channels
      ) VALUES (
        ${testUserId},
        'Test Property',
        'Lodge',
        'balanced',
        'Test challenge',
        ARRAY['Airbnb', 'Direct Bookings']
      )
    `;

    // Verify insert
    const result = await sql`
      SELECT * FROM ancarraig_ai_wizard_responses
      WHERE user_id = ${testUserId}
    `;

    if (result.length > 0) {
      console.log('✅ Write: Test record inserted successfully');
      console.log('✅ Read: Test record retrieved successfully');

      // Clean up
      await sql`DELETE FROM ancarraig_ai_wizard_responses WHERE user_id = ${testUserId}`;
      console.log('✅ Delete: Test record cleaned up\n');
    } else {
      console.error('❌ Write: Test record not found after insert\n');
      allPassed = false;
    }
  } catch (error) {
    console.error(`❌ Write Test Failed: ${error.message}\n`);
    allPassed = false;
  }

  // Final Report
  console.log('╔══════════════════════════════════════════════════════════╗');
  if (allPassed) {
    console.log('║                    ✅ ALL TESTS PASSED                    ║');
    console.log('║                                                           ║');
    console.log('║  Wizard integration is fully connected and operational    ║');
  } else {
    console.log('║                    ❌ SOME TESTS FAILED                   ║');
    console.log('║                                                           ║');
    console.log('║  Please review the errors above                           ║');
  }
  console.log('╚══════════════════════════════════════════════════════════╝');

  process.exit(allPassed ? 0 : 1);
}

testConnectivity().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  process.exit(1);
});
