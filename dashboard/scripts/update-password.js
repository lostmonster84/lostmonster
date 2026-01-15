#!/usr/bin/env node

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const path = require('path');

async function updatePassword() {
  // Load env vars
  require('dotenv').config({ path: path.join(__dirname, '../apps/web/.env.local') });

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  // Get credentials from command line
  const [email, newPassword] = process.argv.slice(2);

  if (!email || !newPassword) {
    console.error('Usage: node update-password.js <email> <new_password>');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🔐 Hashing new password...');
    const passwordHash = await bcrypt.hash(newPassword, 10);

    console.log('💾 Updating password...');
    const result = await sql`
      UPDATE users
      SET password_hash = ${passwordHash}, updated_at = now()
      WHERE email = ${email}
      RETURNING email
    `;

    if (result.length === 0) {
      console.error('❌ User not found');
      process.exit(1);
    }

    console.log('✅ Password updated successfully!');
    console.log(`\n📧 Email: ${email}`);
    console.log('🔑 New Password: ********\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePassword();
