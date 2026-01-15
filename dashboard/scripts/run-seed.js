// Run Ancarraig seed data
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function runSeed() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment');
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);

  // Read seed file
  const seedPath = path.join(__dirname, 'seed-ancarraig.sql');
  const seedContent = fs.readFileSync(seedPath, 'utf8');

  console.log('🌱 Seeding sample data...\n');

  // Split by semicolons but keep DO blocks together
  const statements = [];
  let currentStatement = '';
  let inDoBlock = false;

  seedContent.split('\n').forEach(line => {
    // Skip comment lines
    if (line.trim().startsWith('--')) return;

    currentStatement += line + '\n';

    if (line.includes('DO $$')) {
      inDoBlock = true;
    }

    if (line.includes('END $$;')) {
      inDoBlock = false;
      statements.push(currentStatement.trim());
      currentStatement = '';
    } else if (!inDoBlock && line.trim().endsWith(';')) {
      statements.push(currentStatement.trim());
      currentStatement = '';
    }
  });

  for (const statement of statements) {
    if (!statement || statement.length < 5) continue;

    try {
      await sql(statement);

      if (statement.includes('INSERT INTO ancarraig_lodges')) {
        console.log('  ✓ Created lodge: Farmhouse Lodge (FH)');
      } else if (statement.includes('ancarraig_costs')) {
        console.log('  ✓ Added costs (fixed & variable)');
      } else if (statement.includes('ancarraig_seasons')) {
        console.log('  ✓ Added seasonal modifiers');
      }
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.error(`❌ Error: ${error.message}`);
      }
    }
  }

  // Verify data
  try {
    const lodges = await sql`SELECT COUNT(*) as count FROM ancarraig_lodges`;
    const costs = await sql`SELECT COUNT(*) as count FROM ancarraig_costs`;
    const seasons = await sql`SELECT COUNT(*) as count FROM ancarraig_seasons`;

    console.log('\n✅ Seed complete!');
    console.log(`   ${lodges[0].count} lodge(s)`);
    console.log(`   ${costs[0].count} cost items`);
    console.log(`   ${seasons[0].count} seasonal modifiers`);
  } catch (error) {
    console.error('Could not verify data:', error.message);
  }
}

runSeed().catch(console.error);
