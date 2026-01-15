// Run Ancarraig AI migration using Neon client
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
  const migrationPath = path.join(__dirname, 'ancarraig-ai-migration.sql');
  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running Ancarraig AI migration...\n');

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
        const tableName = statement.match(/CREATE TABLE (?:IF NOT EXISTS )?(\w+)/)?.[1];
        console.log(`  ✓ Created table: ${tableName}`);
      } else if (statement.includes('CREATE INDEX')) {
        const indexName = statement.match(/CREATE INDEX (?:IF NOT EXISTS )?(\w+)/)?.[1];
        console.log(`  ✓ Created index: ${indexName}`);
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
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'ancarraig_ai_%'
      ORDER BY table_name
    `;

    console.log(`\n📊 AI Tables created:`);
    result.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
  } catch (error) {
    console.error('Could not verify tables:', error.message);
  }
}

runMigration().catch(console.error);
