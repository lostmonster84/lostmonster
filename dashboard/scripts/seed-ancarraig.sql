-- Ancarraig Revenue Control - Sample Data
-- Creates 1 lodge with realistic costs and seasonal modifiers

-- Insert sample lodge
INSERT INTO ancarraig_lodges (name, code, description, capacity_guests, capacity_bedrooms, capacity_bathrooms, location, is_active)
VALUES (
  'Farmhouse Lodge',
  'FH',
  'Traditional Scottish farmhouse with stunning Highland views',
  6,
  3,
  2.0,
  'Scottish Highlands',
  true
);

-- Get the lodge ID for foreign keys
DO $$
DECLARE
  lodge_id UUID;
BEGIN
  SELECT id INTO lodge_id FROM ancarraig_lodges WHERE code = 'FH' LIMIT 1;

  -- Insert fixed costs (annual/monthly)
  INSERT INTO ancarraig_costs (lodge_id, name, category, amount, period, is_active) VALUES
    (lodge_id, 'Mortgage', 'fixed', 18000.00, 'annual', true),
    (lodge_id, 'Property Tax', 'fixed', 2400.00, 'annual', true),
    (lodge_id, 'Insurance', 'fixed', 1800.00, 'annual', true),
    (lodge_id, 'Utilities (Electric/Water)', 'fixed', 180.00, 'monthly', true),
    (lodge_id, 'WiFi & Internet', 'fixed', 45.00, 'monthly', true),
    (lodge_id, 'Property Management', 'fixed', 150.00, 'monthly', true);

  -- Insert variable costs (per night/booking)
  INSERT INTO ancarraig_costs (lodge_id, name, category, amount, period, is_active) VALUES
    (lodge_id, 'Professional Cleaning', 'per_booking', 120.00, 'per_booking', true),
    (lodge_id, 'Linen Service', 'per_booking', 45.00, 'per_booking', true),
    (lodge_id, 'Welcome Pack', 'per_booking', 25.00, 'per_booking', true),
    (lodge_id, 'Maintenance Fund', 'variable', 8.00, 'per_night', true);

  -- Insert seasonal modifiers
  INSERT INTO ancarraig_seasons (lodge_id, name, start_date, end_date, multiplier, priority, is_active) VALUES
    (lodge_id, 'Summer Peak', '2025-07-01', '2025-08-31', 1.5, 10, true),
    (lodge_id, 'Christmas/New Year', '2025-12-20', '2026-01-03', 1.8, 20, true),
    (lodge_id, 'Spring Shoulder', '2025-04-01', '2025-06-30', 1.1, 5, true),
    (lodge_id, 'Autumn Shoulder', '2025-09-01', '2025-10-31', 1.1, 5, true),
    (lodge_id, 'Winter Low', '2025-11-01', '2025-12-19', 0.8, 1, true),
    (lodge_id, 'Early Spring Low', '2026-01-04', '2026-03-31', 0.8, 1, true);

  RAISE NOTICE 'Sample data created for Farmhouse Lodge (%)!', lodge_id;
END $$;
