// Database types for Neon PostgreSQL

// Users table (for NextAuth)
export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  avatar_url: string | null;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
  updated_at: string;
}

// Services table
export interface Service {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  price_per_hour: number | null;
  category: 'development' | 'design' | 'consulting' | 'maintenance';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Quotes table
export interface Quote {
  id: string;
  quote_number: string;
  client_name: string;
  client_email: string | null;
  client_company: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  subtotal: number;
  discount_percent: number;
  tax_percent: number;
  total: number;
  valid_until: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Quote items table
export interface QuoteItem {
  id: string;
  quote_id: string;
  service_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  sort_order: number;
  created_at: string;
}

// Portfolios table
export interface Portfolio {
  id: string;
  name: string;
  description: string | null;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Investments table
export interface Investment {
  id: string;
  portfolio_id: string;
  name: string;
  ticker: string | null;
  type: 'stock' | 'etf' | 'crypto' | 'property' | 'cash' | 'bond' | 'other';
  quantity: number;
  average_cost: number;
  current_price: number | null;
  current_value: number | null;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Investment transactions table
export interface InvestmentTransaction {
  id: string;
  investment_id: string;
  type: 'buy' | 'sell' | 'dividend' | 'transfer_in' | 'transfer_out' | 'fee';
  quantity: number;
  price_per_unit: number;
  total_amount: number;
  fees: number;
  transaction_date: string;
  notes: string | null;
  created_by: string | null;
  created_at: string;
}

// Boards table
export interface Board {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Task columns table
export interface TaskColumn {
  id: string;
  board_id: string;
  name: string;
  color: string;
  sort_order: number;
  created_at: string;
}

// Tasks table
export interface Task {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  assignee_id: string | null;
  labels: string[];
  sort_order: number;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}
