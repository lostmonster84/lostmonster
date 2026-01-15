// Run Wizard Table Migration
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment');
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);

  // Read migration file
  const migrationPath = path.join(__dirname, 'ancarraig-wizard-setup.sql');
  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running Wizard Table migration...\n');

  // Split SQL into individual statements
  const statements = migrationContent
    .split('\n')
    .filter(line => !line.trim().startsWith('--') && line.trim() !== '')
    .join('\n')
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  let successCount = 0;
  let skipCount = 0;

  for (const statement of statements) {
    try {
      await sql(statement);
      successCount++;

      if (statement.includes('CREATE TABLE')) {
        console.log('  ✓ Created table: ancarraig_ai_wizard_responses');
      } else if (statement.includes('CREATE INDEX') || statement.includes('CREATE UNIQUE INDEX')) {
        const indexName = statement.match(/CREATE (?:UNIQUE )?INDEX (?:IF NOT EXISTS )?(\w+)/)?.[1];
        console.log(`  ✓ Created index: ${indexName}`);
      }
    } catch (error) {
      if (error.message.includes('already exists')) {
        skipCount++;
      } else {
        console.error(`❌ Error: ${error.message}`);
        console.error(`Statement: ${statement.substring(0, 100)}...`);
      }
    }
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   ${successCount} statements executed`);
  if (skipCount > 0) {
    console.log(`   ${skipCount} statements skipped (already exist)`);
  }

  // Verify the table exists
  try {
    const result = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'ancarraig_ai_wizard_responses'
    `;

    if (result.length > 0) {
      console.log('\n✅ Verified: ancarraig_ai_wizard_responses table exists');
    }
  } catch (error) {
    console.error('Could not verify table:', error.message);
  }
}

runMigration().catch(console.error);
