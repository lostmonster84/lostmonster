// Run Ancarraig migration using Neon client
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
  const migrationPath = path.join(__dirname, 'ancarraig-setup.sql');
  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running Ancarraig migration...\n');

  // Split SQL into individual statements
  // Remove comments and split by semicolons
  const statements = migrationContent
    .split('\n')
    .filter(line => !line.trim().startsWith('--') && line.trim() !== '')
    .join('\n')
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('COMMENT ON'));

  let successCount = 0;
  let skipCount = 0;

  for (const statement of statements) {
    if (statement.includes('COMMENT ON')) {
      skipCount++;
      continue;
    }

    try {
      await sql(statement);
      successCount++;

      // Log progress for major statements
      if (statement.includes('CREATE TABLE')) {
        const tableName = statement.match(/CREATE TABLE (\w+)/)?.[1];
        console.log(`  ✓ Created table: ${tableName}`);
      } else if (statement.includes('CREATE INDEX')) {
        const indexName = statement.match(/CREATE INDEX (\w+)/)?.[1];
        console.log(`  ✓ Created index: ${indexName}`);
      } else if (statement.includes('CREATE TRIGGER')) {
        const triggerName = statement.match(/CREATE TRIGGER (\w+)/)?.[1];
        console.log(`  ✓ Created trigger: ${triggerName}`);
      }
    } catch (error) {
      // Ignore "already exists" errors
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
    console.log(`   ${skipCount} statements skipped (already exist or comments)`);
  }

  // Verify tables created
  try {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'ancarraig_%'
    `;

    console.log(`\n📊 Total Ancarraig tables: ${result[0].count}`);
  } catch (error) {
    console.error('Could not verify tables:', error.message);
  }
}

runMigration().catch(console.error);
