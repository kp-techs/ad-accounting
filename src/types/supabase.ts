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
      incomes: {
        Row: {
          amount: number | null
          comment: string | null
          concept: string | null
          createdBy: string | null
          createdDate: string | null
          date: string
          eventName: string | null
          id: number
          ministryID: number | null
          tithingID: number | null
          type: number | null
          updatedBy: string | null
          updatedDate: string | null
        }
        Insert: {
          amount?: number | null
          comment?: string | null
          concept?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date: string
          eventName?: string | null
          id?: number
          ministryID?: number | null
          tithingID?: number | null
          type?: number | null
          updatedBy?: string | null
          updatedDate?: string | null
        }
        Update: {
          amount?: number | null
          comment?: string | null
          concept?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date?: string
          eventName?: string | null
          id?: number
          ministryID?: number | null
          tithingID?: number | null
          type?: number | null
          updatedBy?: string | null
          updatedDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incomes_ministryID_fkey"
            columns: ["ministryID"]
            referencedRelation: "ministries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incomes_tithingID_fkey"
            columns: ["tithingID"]
            referencedRelation: "tithing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incomes_type_fkey"
            columns: ["type"]
            referencedRelation: "incomeTypes"
            referencedColumns: ["id"]
          }
        ]
      }
      incomeType: {
        Row: {
          id: number | null
          type: string
        }
        Insert: {
          id?: number | null
          type?: string
        }
        Update: {
          id?: number | null
          type?: string
        }
        Relationships: []
      }
      incomeTypes: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      ministries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      tithing: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string | null
          email_change: string | null
          email_change_sent_at: string | null
          id: string
          invitedby: string | null
          last_sign_in_at: string | null
          name: string | null
          recovery_sent_at: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_sent_at?: string | null
          id: string
          invitedby?: string | null
          last_sign_in_at?: string | null
          name?: string | null
          recovery_sent_at?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_sent_at?: string | null
          id?: string
          invitedby?: string | null
          last_sign_in_at?: string | null
          name?: string | null
          recovery_sent_at?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
