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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      course_evaluations: {
        Row: {
          created_at: string
          escala_conteudos: number
          escala_formador: number
          escala_materiais: number
          escala_metodologia: number
          escala_objetivos: number
          escala_organizacao: number
          escala_sincronas: number
          id: string
          perfil: string | null
          pontos_fortes: string
          pontos_melhorar: string
          recomendacao: number
          satisfacao_global: number
          sugestoes: string
        }
        Insert: {
          created_at?: string
          escala_conteudos: number
          escala_formador: number
          escala_materiais: number
          escala_metodologia: number
          escala_objetivos: number
          escala_organizacao: number
          escala_sincronas: number
          id?: string
          perfil?: string | null
          pontos_fortes?: string
          pontos_melhorar?: string
          recomendacao: number
          satisfacao_global: number
          sugestoes?: string
        }
        Update: {
          created_at?: string
          escala_conteudos?: number
          escala_formador?: number
          escala_materiais?: number
          escala_metodologia?: number
          escala_objetivos?: number
          escala_organizacao?: number
          escala_sincronas?: number
          id?: string
          perfil?: string | null
          pontos_fortes?: string
          pontos_melhorar?: string
          recomendacao?: number
          satisfacao_global?: number
          sugestoes?: string
        }
        Relationships: []
      }
      evaluation_submissions: {
        Row: {
          submitted_at: string
          user_id: string
        }
        Insert: {
          submitted_at?: string
          user_id: string
        }
        Update: {
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      module_status: {
        Row: {
          created_at: string
          is_open: boolean
          module_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          is_open?: boolean
          module_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          is_open?: boolean
          module_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      progress: {
        Row: {
          created_at: string
          id: string
          section_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          section_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_answers: {
        Row: {
          answered_at: string
          created_at: string
          id: string
          is_correct: boolean
          quiz_id: string
          selected_option: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answered_at?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          quiz_id: string
          selected_option: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answered_at?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          quiz_id?: string
          selected_option?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      written_responses: {
        Row: {
          activity_id: string
          created_at: string
          id: string
          response_text: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_id: string
          created_at?: string
          id?: string
          response_text?: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_id?: string
          created_at?: string
          id?: string
          response_text?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_write_module: { Args: { _id: string }; Returns: boolean }
      has_completed_mf3: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      module_key_of: { Args: { _id: string }; Returns: string }
      submit_course_evaluation: {
        Args: {
          _escala_conteudos: number
          _escala_formador: number
          _escala_materiais: number
          _escala_metodologia: number
          _escala_objetivos: number
          _escala_organizacao: number
          _escala_sincronas: number
          _perfil: string
          _pontos_fortes: string
          _pontos_melhorar: string
          _recomendacao: number
          _satisfacao_global: number
          _sugestoes: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "formando" | "formador"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["formando", "formador"],
    },
  },
} as const
