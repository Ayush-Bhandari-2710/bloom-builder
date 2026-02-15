export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bouquet_items: {
        Row: {
          bouquet_id: string
          created_at: string
          flower_type: string
          id: string
          opacity: number
          rotation: number
          scale: number
          stem_length: number | null
          updated_at: string
          x: number
          y: number
          z_index: number
        }
        Insert: {
          bouquet_id: string
          created_at?: string
          flower_type: string
          id?: string
          opacity?: number
          rotation?: number
          scale?: number
          stem_length?: number | null
          updated_at?: string
          x: number
          y: number
          z_index?: number
        }
        Update: {
          bouquet_id?: string
          created_at?: string
          flower_type?: string
          id?: string
          opacity?: number
          rotation?: number
          scale?: number
          stem_length?: number | null
          updated_at?: string
          x?: number
          y?: number
          z_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "bouquet_items_bouquet_id_fkey"
            columns: ["bouquet_id"]
            isOneToOne: false
            referencedRelation: "bouquets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bouquet_items_bouquet_id_fkey"
            columns: ["bouquet_id"]
            isOneToOne: false
            referencedRelation: "bouquets_public"
            referencedColumns: ["id"]
          },
        ]
      }
      bouquets: {
        Row: {
          created_at: string
          edit_token_hash: string
          id: string
          is_published: boolean
          pot_style: string | null
          published_at: string | null
          title: string
          unlock_time: string | null
          updated_at: string
          view_count: number
          view_mode: string
        }
        Insert: {
          created_at?: string
          edit_token_hash: string
          id?: string
          is_published?: boolean
          pot_style?: string | null
          published_at?: string | null
          title?: string
          unlock_time?: string | null
          updated_at?: string
          view_count?: number
          view_mode?: string
        }
        Update: {
          created_at?: string
          edit_token_hash?: string
          id?: string
          is_published?: boolean
          pot_style?: string | null
          published_at?: string | null
          title?: string
          unlock_time?: string | null
          updated_at?: string
          view_count?: number
          view_mode?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          is_hidden: boolean
          item_id: string
          message_text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_hidden?: boolean
          item_id: string
          message_text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_hidden?: boolean
          item_id?: string
          message_text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "bouquet_items"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_votes: {
        Row: {
          created_at: string
          id: string
          ip_hash: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_hash: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_hash?: string
        }
        Relationships: []
      }
      views: {
        Row: {
          bouquet_id: string
          id: string
          ip_hash: string
          viewed_at: string
        }
        Insert: {
          bouquet_id: string
          id?: string
          ip_hash: string
          viewed_at?: string
        }
        Update: {
          bouquet_id?: string
          id?: string
          ip_hash?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "views_bouquet_id_fkey"
            columns: ["bouquet_id"]
            isOneToOne: false
            referencedRelation: "bouquets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_bouquet_id_fkey"
            columns: ["bouquet_id"]
            isOneToOne: false
            referencedRelation: "bouquets_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      bouquets_public: {
        Row: {
          created_at: string | null
          id: string | null
          is_published: boolean | null
          pot_style: string | null
          published_at: string | null
          title: string | null
          unlock_time: string | null
          updated_at: string | null
          view_count: number | null
          view_mode: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_published?: boolean | null
          pot_style?: string | null
          published_at?: string | null
          title?: string | null
          unlock_time?: string | null
          updated_at?: string | null
          view_count?: number | null
          view_mode?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_published?: boolean | null
          pot_style?: string | null
          published_at?: string | null
          title?: string | null
          unlock_time?: string | null
          updated_at?: string | null
          view_count?: number | null
          view_mode?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
