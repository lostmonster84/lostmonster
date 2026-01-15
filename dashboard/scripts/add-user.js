#!/usr/bin/env node

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const path = require('path');

async function addUser() {
  // Load env vars
  require('dotenv').config({ path: path.join(__dirname, '../apps/web/.env.local') });

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  // Get credentials from command line
  const [email, password, fullName] = process.argv.slice(2);

  if (!email || !password || !fullName) {
    console.error('Usage: node add-user.js <email> <password> <full_name>');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🔐 Hashing password...');
    const passwordHash = await bcrypt.hash(password, 10);

    console.log('💾 Creating user account...');
    await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (${email}, ${passwordHash}, ${fullName}, 'owner')
    `;

    console.log('✅ Admin account created successfully!');
    console.log(`\n📧 Email: ${email}`);
    console.log('🔑 Password: ********\n');
    console.log('You can now login at http://localhost:3000/login');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addUser();
