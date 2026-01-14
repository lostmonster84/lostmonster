// Database types - will be generated from Supabase schema
// Run: pnpm supabase gen types typescript --project-id <project-id> > src/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          supabase_user_id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'owner' | 'admin' | 'member';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          supabase_user_id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: 'owner' | 'admin' | 'member';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          supabase_user_id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: 'owner' | 'admin' | 'member';
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          base_price: number;
          price_per_hour: number | null;
          category: 'development' | 'design' | 'consulting' | 'maintenance';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          base_price: number;
          price_per_hour?: number | null;
          category: 'development' | 'design' | 'consulting' | 'maintenance';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          base_price?: number;
          price_per_hour?: number | null;
          category?: 'development' | 'design' | 'consulting' | 'maintenance';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotes: {
        Row: {
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
        };
        Insert: {
          id?: string;
          quote_number: string;
          client_name: string;
          client_email?: string | null;
          client_company?: string | null;
          status?: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
          subtotal?: number;
          discount_percent?: number;
          tax_percent?: number;
          total?: number;
          valid_until?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote_number?: string;
          client_name?: string;
          client_email?: string | null;
          client_company?: string | null;
          status?: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
          subtotal?: number;
          discount_percent?: number;
          tax_percent?: number;
          total?: number;
          valid_until?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_items: {
        Row: {
          id: string;
          quote_id: string;
          service_id: string | null;
          description: string;
          quantity: number;
          unit_price: number;
          total: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          service_id?: string | null;
          description: string;
          quantity?: number;
          unit_price: number;
          total: number;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          service_id?: string | null;
          description?: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
          sort_order?: number;
          created_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          currency: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      investments: {
        Row: {
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
        };
        Insert: {
          id?: string;
          portfolio_id: string;
          name: string;
          ticker?: string | null;
          type: 'stock' | 'etf' | 'crypto' | 'property' | 'cash' | 'bond' | 'other';
          quantity?: number;
          average_cost?: number;
          current_price?: number | null;
          current_value?: number | null;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          portfolio_id?: string;
          name?: string;
          ticker?: string | null;
          type?: 'stock' | 'etf' | 'crypto' | 'property' | 'cash' | 'bond' | 'other';
          quantity?: number;
          average_cost?: number;
          current_price?: number | null;
          current_value?: number | null;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      investment_transactions: {
        Row: {
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
        };
        Insert: {
          id?: string;
          investment_id: string;
          type: 'buy' | 'sell' | 'dividend' | 'transfer_in' | 'transfer_out' | 'fee';
          quantity: number;
          price_per_unit: number;
          total_amount: number;
          fees?: number;
          transaction_date: string;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          investment_id?: string;
          type?: 'buy' | 'sell' | 'dividend' | 'transfer_in' | 'transfer_out' | 'fee';
          quantity?: number;
          price_per_unit?: number;
          total_amount?: number;
          fees?: number;
          transaction_date?: string;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };
      boards: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      task_columns: {
        Row: {
          id: string;
          board_id: string;
          name: string;
          color: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          board_id: string;
          name: string;
          color?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          board_id?: string;
          name?: string;
          color?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      tasks: {
        Row: {
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
        };
        Insert: {
          id?: string;
          column_id: string;
          title: string;
          description?: string | null;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          due_date?: string | null;
          assignee_id?: string | null;
          labels?: string[];
          sort_order?: number;
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          column_id?: string;
          title?: string;
          description?: string | null;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          due_date?: string | null;
          assignee_id?: string | null;
          labels?: string[];
          sort_order?: number;
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Convenience types
export type TeamMember = Tables<'team_members'>;
export type Service = Tables<'services'>;
export type Quote = Tables<'quotes'>;
export type QuoteItem = Tables<'quote_items'>;
export type Portfolio = Tables<'portfolios'>;
export type Investment = Tables<'investments'>;
export type InvestmentTransaction = Tables<'investment_transactions'>;
export type Board = Tables<'boards'>;
export type TaskColumn = Tables<'task_columns'>;
export type Task = Tables<'tasks'>;
