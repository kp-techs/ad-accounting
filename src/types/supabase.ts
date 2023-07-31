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
      beneficiaries: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      creditors: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
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
      loans: {
        Row: {
          creditorID: number | null
          currentLoanAmount: number | null
          description: string | null
          id: number
          initialLoanAmount: number | null
          paidAmount: number | null
        }
        Insert: {
          creditorID?: number | null
          currentLoanAmount?: number | null
          description?: string | null
          id?: number
          initialLoanAmount?: number | null
          paidAmount?: number | null
        }
        Update: {
          creditorID?: number | null
          currentLoanAmount?: number | null
          description?: string | null
          id?: number
          initialLoanAmount?: number | null
          paidAmount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_creditorID_fkey"
            columns: ["creditorID"]
            referencedRelation: "creditors"
            referencedColumns: ["id"]
          }
        ]
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
      outgoings: {
        Row: {
          amount: number | null
          beneficiaryID: number | null
          checkNumber: string | null
          createdBy: string | null
          createdDate: string | null
          date: string | null
          description: string | null
          id: number
          modifiedAt: string | null
          modifiedBy: string | null
          type: number | null
        }
        Insert: {
          amount?: number | null
          beneficiaryID?: number | null
          checkNumber?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date?: string | null
          description?: string | null
          id?: number
          modifiedAt?: string | null
          modifiedBy?: string | null
          type?: number | null
        }
        Update: {
          amount?: number | null
          beneficiaryID?: number | null
          checkNumber?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date?: string | null
          description?: string | null
          id?: number
          modifiedAt?: string | null
          modifiedBy?: string | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoings_beneficiaryID_fkey"
            columns: ["beneficiaryID"]
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoings_type_fkey"
            columns: ["type"]
            referencedRelation: "outgoingTypes"
            referencedColumns: ["id"]
          }
        ]
      }
      outgoingTypes: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
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
          invited_by: string | null
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
          invited_by?: string | null
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
          invited_by?: string | null
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
