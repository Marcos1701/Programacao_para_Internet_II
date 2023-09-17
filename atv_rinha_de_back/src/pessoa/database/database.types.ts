export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pessoa: {
        Row: {
          apelido: string
          id: string
          nascimento: string
          nome: string
        }
        Insert: {
          apelido: string
          id: string
          nascimento: string
          nome: string
        }
        Update: {
          apelido?: string
          id?: string
          nascimento?: string
          nome?: string
        }
        Relationships: []
      }
      stack: {
        Row: {
          id_pessoa: string | null
          stack: string
        }
        Insert: {
          id_pessoa?: string | null
          stack: string
        }
        Update: {
          id_pessoa?: string | null
          stack?: string
        }
        Relationships: [
          {
            foreignKeyName: "stack_id_pessoa_fkey"
            columns: ["id_pessoa"]
            referencedRelation: "pessoa"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_stack: {
        Args: {
          id: string
        }
        Returns: {
          stack: string
        }[]
      }
      search: {
        Args: {
          word: string
        }
        Returns: {
          id: string
          apelido: string
          nome: string
          nascimento: string
          stack: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
