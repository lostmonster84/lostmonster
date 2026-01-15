#!/usr/bin/env node

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  // Load env vars
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../apps/web/.env.local') });

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🚀 Setting up Lost Monster Dashboard database...\n');

    // Create users table
    console.log('📊 Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        avatar_url TEXT,
        role TEXT DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'member')),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `;

    // Create index
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;

    // Create trigger function
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `;

    // Create trigger
    await sql`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users
    `;
    await sql`
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column()
    `;

    console.log('✅ Users table created successfully!\n');

    // Prompt for user details
    console.log('👤 Create your admin account:\n');
    const email = await question('Email: ');
    const password = await question('Password: ');
    const fullName = await question('Full Name: ');

    if (!email || !password || !fullName) {
      console.error('❌ All fields are required');
      rl.close();
      process.exit(1);
    }

    // Hash password
    console.log('\n🔐 Hashing password...');
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    console.log('💾 Creating user account...');
    await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (${email}, ${passwordHash}, ${fullName}, 'owner')
    `;

    console.log('✅ Admin account created successfully!\n');
    console.log('🎉 Database setup complete!');
    console.log('\nYou can now run:');
    console.log('  cd apps/web');
    console.log('  pnpm dev');
    console.log('\nThen login at http://localhost:3000/login');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setup();
