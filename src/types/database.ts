export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string; email: string | null; phone: string | null; country: string | null; created_at: string; updated_at: string }
        Insert: { id: string; name: string; email?: string | null; phone?: string | null; country?: string | null }
        Update: { name?: string; phone?: string | null; country?: string | null; updated_at?: string }
        Relationships: []
      }
      children: {
        Row: { id: string; parent_id: string; name: string; date_of_birth: string; age: number; relationship: string; photo_url: string | null; created_at: string }
        Insert: { parent_id: string; name: string; date_of_birth: string; age: number; relationship?: string; photo_url?: string | null }
        Update: { name?: string; date_of_birth?: string; age?: number; relationship?: string; photo_url?: string | null }
        Relationships: []
      }
      credits: {
        Row: { id: string; parent_id: string; balance: number; created_at: string; updated_at: string }
        Insert: { parent_id: string; balance?: number }
        Update: { balance?: number; updated_at?: string }
        Relationships: []
      }
      test_sessions: {
        Row: { id: string; child_id: string; parent_id: string; topic: string; is_free: boolean; status: string; answers: Json; started_at: string; completed_at: string | null }
        Insert: { child_id: string; parent_id: string; topic: string; is_free?: boolean; status?: string; answers?: Json; completed_at?: string | null }
        Update: { status?: string; answers?: Json; completed_at?: string | null }
        Relationships: []
      }
      reports: {
        Row: { id: string; session_id: string; child_id: string; parent_id: string; topic: string; overall_score: number; overall_label: string; domain_scores: Json; insights: Json; parent_notes: string | null; generated_at: string }
        Insert: { session_id: string; child_id: string; parent_id: string; topic: string; overall_score: number; overall_label: string; domain_scores: Json; insights: Json; parent_notes?: string | null }
        Update: { domain_scores?: Json; insights?: Json; parent_notes?: string | null }
        Relationships: []
      }
      transactions: {
        Row: { id: string; parent_id: string; plan: string; amount: number; credits_added: number; upi_ref: string | null; status: string; created_at: string }
        Insert: { parent_id: string; plan: string; amount: number; credits_added: number; upi_ref?: string | null; status?: string }
        Update: { upi_ref?: string | null; status?: string }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      deduct_credit: { Args: { p_parent_id: string }; Returns: void }
      add_credits: { Args: { p_parent_id: string; p_amount: number }; Returns: void }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Child = Database['public']['Tables']['children']['Row']
export type Credits = Database['public']['Tables']['credits']['Row']
export type TestSession = Database['public']['Tables']['test_sessions']['Row']
export type Report = Database['public']['Tables']['reports']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
