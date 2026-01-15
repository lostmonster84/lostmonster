// Database types for Neon PostgreSQL

// Users table (for NextAuth + ADMINX)
export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  avatar_url: string | null;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'inactive' | 'suspended';
  last_login: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// User role type
export type UserRole = 'owner' | 'admin' | 'member';

// User status type
export type UserStatus = 'active' | 'inactive' | 'suspended';

// General audit logs table (for ADMINX)
export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  before_value: Record<string, any> | null;
  after_value: Record<string, any> | null;
  reason: string | null;
  metadata: Record<string, any>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
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

// ============================================================================
// Ancarraig Revenue Control System Types
// ============================================================================

// Lodges (rental properties)
export interface AncarraigLodge {
  id: string;
  name: string;
  code: string;
  description: string | null;
  capacity_guests: number;
  capacity_bedrooms: number;
  capacity_bathrooms: number;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Cost items (fixed and variable)
export interface AncarraigCost {
  id: string;
  lodge_id: string;
  name: string;
  category: 'fixed' | 'variable' | 'per_booking';
  amount: number;
  period: 'annual' | 'monthly' | 'per_night' | 'per_booking';
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Seasonal modifiers
export interface AncarraigSeason {
  id: string;
  lodge_id: string;
  name: string;
  start_date: string;
  end_date: string;
  multiplier: number;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Target rates (cached calculations)
export interface AncarraigTargetRate {
  id: string;
  lodge_id: string;
  date: string;
  nightly_breakeven: number;
  nightly_target: number;
  weekly_breakeven: number;
  weekly_target: number;
  seasonal_multiplier: number;
  calculation_basis: Record<string, any>;
  calculated_at: string;
}

// Current/historical rates
export interface AncarraigRate {
  id: string;
  lodge_id: string;
  date: string;
  nightly_rate: number | null;
  weekly_rate: number | null;
  source: string;
  source_url: string | null;
  channel: string | null;
  confidence_score: number | null;
  scraped_at: string | null;
  notes: string | null;
  created_at: string;
}

// Bookings
export interface AncarraigBooking {
  id: string;
  lodge_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  guest_count: number | null;
  total_revenue: number;
  channel: string;
  channel_fees: number;
  cleaning_fee: number;
  other_fees: number;
  net_revenue: number | null;
  guest_name: string | null;
  guest_email: string | null;
  status: 'confirmed' | 'cancelled' | 'pending';
  booking_date: string | null;
  source: string;
  external_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Rate alerts
export interface AncarraigRateAlert {
  id: string;
  lodge_id: string;
  date: string;
  current_rate: number | null;
  target_rate: number | null;
  breakeven_rate: number | null;
  variance_percent: number | null;
  risk_level: 'critical' | 'warning' | 'ok' | 'excellent';
  is_booked: boolean;
  recommended_action: string | null;
  checked_at: string;
  dismissed_at: string | null;
  dismissed_by: string | null;
  created_at: string;
}

// Competitors
export interface AncarraigCompetitor {
  id: string;
  name: string;
  type: string | null;
  location: string | null;
  capacity_guests: number | null;
  distance_km: number | null;
  airbnb_url: string | null;
  booking_url: string | null;
  direct_url: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Competitor rates
export interface AncarraigCompetitorRate {
  id: string;
  competitor_id: string;
  date: string;
  nightly_rate: number | null;
  weekly_rate: number | null;
  available: boolean | null;
  source: string;
  scraped_at: string;
  created_at: string;
}

// Recommendations
export interface AncarraigRecommendation {
  id: string;
  lodge_id: string;
  date: string;
  current_rate: number | null;
  recommended_rate: number | null;
  confidence_score: number | null;
  reasoning: Record<string, any> | null;
  rule_applied: string | null;
  created_at: string;
  accepted_at: string | null;
  accepted_by: string | null;
  rejected_at: string | null;
  rejected_by: string | null;
  rejection_reason: string | null;
}

// Audit log
export interface AncarraigAuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  before_value: Record<string, any> | null;
  after_value: Record<string, any> | null;
  reason: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// Channel commission configurations (Phase 2)
export interface AncarraigChannel {
  id: string;
  channel_name: 'booking.com' | 'airbnb' | 'direct';
  base_commission_percent: number;
  charges_cleaning_commission: boolean;
  supports_genius: boolean;
  genius_discount_percent: number | null;
  non_refundable_discount_percent: number | null;
  created_at: string;
  updated_at: string;
}

// Calculator usage history (Phase 2)
export interface AncarraigCalculatorUsage {
  id: string;
  lodge_id: string;
  channel: string;
  target_net: number;
  calculated_listing_price: number;
  stay_length: number;
  date_range_start: string;
  date_range_end: string;
  created_at: string;
}

// Competitor tracking (Phase 3)
export interface AncarraigCompetitor {
  id: string;
  name: string;
  type: string | null;
  location: string | null;
  capacity_guests: number | null;
  distance_km: number | null;
  airbnb_url: string | null;
  booking_url: string | null;
  direct_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Competitor rate tracking (Phase 3)
export interface AncarraigCompetitorRate {
  id: string;
  competitor_id: string;
  date: string;
  nightly_rate: number | null;
  weekly_rate: number | null;
  available: boolean | null;
  source: string;
  scraped_at: string;
  created_at: string;
}

// ============================================================================
// Ancarraig AI Pricing Assistant Types
// ============================================================================

// AI conversation message roles
export type AIMessageRole = 'user' | 'assistant' | 'system';

// AI knowledge categories
export type AIKnowledgeCategory = 'preference' | 'rule' | 'insight' | 'competitor';

// AI conversation messages
export interface AncarraigAIConversation {
  id: string;
  user_id: string;
  role: AIMessageRole;
  message: string;
  metadata: Record<string, any>;
  created_at: string;
}

// AI extracted knowledge
export interface AncarraigAIKnowledge {
  id: string;
  user_id: string;
  category: AIKnowledgeCategory;
  key: string;
  value: string;
  confidence: number;
  source_conversation_id: string | null;
  created_at: string;
  updated_at: string;
}

// API request/response types
export interface AIChatRequest {
  message: string;
  fileData?: string;
}

export interface AIChatResponse {
  role: 'assistant';
  message: string;
  metadata?: Record<string, any>;
}

export interface AIKnowledgeExtraction {
  category: AIKnowledgeCategory;
  key: string;
  value: string;
  confidence: number;
}

// Context for AI prompt building
export interface AIContext {
  conversationHistory: AncarraigAIConversation[];
  knowledgeBase: AncarraigAIKnowledge[];
  lodgeData?: AncarraigLodge[];
  channelData?: AncarraigChannel[];
  costData?: AncarraigCost[];
}
