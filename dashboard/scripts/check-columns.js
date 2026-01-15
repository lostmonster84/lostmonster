const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

async function check() {
  // Check rates table columns
  console.log('Rates table columns:');
  const rates = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'ancarraig_rates'
    ORDER BY ordinal_position
  `;
  rates.forEach(r => console.log('  -', r.column_name));

  // Check bookings table columns
  console.log('\nBookings table columns:');
  const bookings = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'ancarraig_bookings'
    ORDER BY ordinal_position
  `;
  bookings.forEach(r => console.log('  -', r.column_name));

  // Check recommendations table columns
  console.log('\nRecommendations table columns:');
  const recs = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'ancarraig_recommendations'
    ORDER BY ordinal_position
  `;
  recs.forEach(r => console.log('  -', r.column_name));
}

check().catch(console.error);
