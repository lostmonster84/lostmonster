-- ADMINX User Management Migration
-- Run this in your Neon SQL Editor
-- This adds user management features to your existing dashboard

-- ============================================================================
-- 1. Enhance Users Table
-- ============================================================================

-- Create user_role enum (keeps your existing role names)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('owner', 'admin', 'member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_status enum
DO $$ BEGIN
  CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add missing columns to users table (if they don't exist)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Update role column to use enum (safely)
ALTER TABLE users
  ALTER COLUMN role TYPE user_role USING role::user_role;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login DESC);

-- ============================================================================
-- 2. Create General Audit Logs Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  before_value JSONB,          -- Enhanced: capture state before change
  after_value JSONB,           -- Enhanced: capture state after change
  reason TEXT,                 -- Enhanced: reason for change
  metadata JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for filtering and sorting
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- 3. Helper Functions
-- ============================================================================

-- Function to count active owners (for last owner protection)
CREATE OR REPLACE FUNCTION count_active_owners()
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM users
    WHERE role = 'owner' AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to check if user is the last owner
CREATE OR REPLACE FUNCTION is_last_owner(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  owner_count INTEGER;
  target_user_role user_role;
  target_user_status user_status;
BEGIN
  -- Get target user's role and status
  SELECT role, status INTO target_user_role, target_user_status
  FROM users
  WHERE id = user_id;

  -- If not an owner, return false
  IF target_user_role != 'owner' THEN
    RETURN FALSE;
  END IF;

  -- Count active owners
  owner_count := count_active_owners();

  -- If this owner is active and is the last one
  IF owner_count = 1 AND target_user_status = 'active' THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. Constraints and Rules
-- ============================================================================

-- Prevent deleting the last owner (constraint)
CREATE OR REPLACE FUNCTION prevent_last_owner_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.role = 'owner' AND OLD.status = 'active' THEN
    IF count_active_owners() <= 1 THEN
      RAISE EXCEPTION 'Cannot delete the last active owner';
    END IF;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last owner protection
DROP TRIGGER IF EXISTS prevent_last_owner_delete_trigger ON users;
CREATE TRIGGER prevent_last_owner_delete_trigger
  BEFORE DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION prevent_last_owner_delete();

-- Prevent deactivating the last owner
CREATE OR REPLACE FUNCTION prevent_last_owner_deactivate()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if trying to deactivate/suspend an owner
  IF OLD.role = 'owner' AND OLD.status = 'active'
     AND (NEW.status = 'inactive' OR NEW.status = 'suspended') THEN
    IF count_active_owners() <= 1 THEN
      RAISE EXCEPTION 'Cannot deactivate the last active owner';
    END IF;
  END IF;

  -- Check if trying to demote the last owner
  IF OLD.role = 'owner' AND OLD.status = 'active'
     AND NEW.role != 'owner' THEN
    IF count_active_owners() <= 1 THEN
      RAISE EXCEPTION 'Cannot demote the last active owner';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last owner deactivation protection
DROP TRIGGER IF EXISTS prevent_last_owner_deactivate_trigger ON users;
CREATE TRIGGER prevent_last_owner_deactivate_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION prevent_last_owner_deactivate();

-- ============================================================================
-- 5. Sample Audit Log Entry (for testing)
-- ============================================================================

-- Insert a sample audit log (optional, can be removed after testing)
INSERT INTO audit_logs (
  user_id,
  action,
  entity_type,
  entity_id,
  metadata,
  ip_address,
  user_agent
) VALUES (
  NULL,
  'system.migration.completed',
  'database',
  gen_random_uuid(),
  '{"migration": "adminx", "version": "1.0.0"}'::jsonb,
  '127.0.0.1',
  'PostgreSQL Migration Script'
);

-- ============================================================================
-- 6. Verification
-- ============================================================================

-- Check that everything was created successfully
SELECT 'Migration completed successfully!' as status;
SELECT 'Users table columns:' as info;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

SELECT 'Audit logs table created:' as info;
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name = 'audit_logs'
) as audit_logs_exists;

SELECT 'Active owner count:' as info, count_active_owners() as count;
