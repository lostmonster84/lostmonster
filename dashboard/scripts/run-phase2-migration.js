// Run Ancarraig Phase 2 migration using Neon client
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
  const migrationPath = path.join(__dirname, 'ancarraig-phase2-channels.sql');
  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running Ancarraig Phase 2 migration...\n');

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
      const result = await sql(statement);
      successCount++;

      // Log progress for major statements
      if (statement.includes('CREATE TABLE')) {
        const tableName = statement.match(/CREATE TABLE .*?(\w+)/)?.[1] || statement.match(/ancarraig_\w+/)?.[0];
        console.log(`  ✓ Created table: ${tableName}`);
      } else if (statement.includes('INSERT INTO')) {
        console.log(`  ✓ Seeded default channels`);
      } else if (statement.includes('CREATE INDEX')) {
        const indexName = statement.match(/CREATE INDEX .*?(\w+)/)?.[1];
        console.log(`  ✓ Created index: ${indexName}`);
      } else if (statement.includes('SELECT')) {
        console.log(`  ✓ ${result[0]?.status || 'Success'}`);
      }
    } catch (error) {
      // Ignore "already exists" errors
      if (error.message.includes('already exists') || error.message.includes('duplicate key')) {
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

  // Verify channels table exists
  try {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM ancarraig_channels
    `;

    console.log(`\n📊 Total channels in database: ${result[0].count}`);
    console.log('\n✨ The Ancarraig calculator should now work! Refresh your browser.');
  } catch (error) {
    console.error('Could not verify channels table:', error.message);
  }
}

runMigration().catch(console.error);
