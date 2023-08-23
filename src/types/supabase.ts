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
          loanID: number | null
          loanName: string | null
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
          loanID?: number | null
          loanName?: string | null
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
          loanID?: number | null
          loanName?: string | null
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
            referencedRelation: "people"
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
          createdAt: string | null
          createdBy: string | null
          creditorID: number | null
          currentLoanAmount: number | null
          date: string | null
          description: string | null
          id: number
          incomeID: number | null
          initialLoanAmount: number | null
          name: string | null
          paidAmount: number | null
          status: string | null
          updateAt: string | null
          updateBy: string | null
        }
        Insert: {
          createdAt?: string | null
          createdBy?: string | null
          creditorID?: number | null
          currentLoanAmount?: number | null
          date?: string | null
          description?: string | null
          id?: number
          incomeID?: number | null
          initialLoanAmount?: number | null
          name?: string | null
          paidAmount?: number | null
          status?: string | null
          updateAt?: string | null
          updateBy?: string | null
        }
        Update: {
          createdAt?: string | null
          createdBy?: string | null
          creditorID?: number | null
          currentLoanAmount?: number | null
          date?: string | null
          description?: string | null
          id?: number
          incomeID?: number | null
          initialLoanAmount?: number | null
          name?: string | null
          paidAmount?: number | null
          status?: string | null
          updateAt?: string | null
          updateBy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_creditorID_fkey"
            columns: ["creditorID"]
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_incomeID_fkey"
            columns: ["incomeID"]
            referencedRelation: "incomes"
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
          loanID: number | null
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
          loanID?: number | null
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
          loanID?: number | null
          modifiedAt?: string | null
          modifiedBy?: string | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoings_beneficiaryID_fkey"
            columns: ["beneficiaryID"]
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoings_loanID_fkey"
            columns: ["loanID"]
            referencedRelation: "loans"
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
      people: {
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
      echo: {
        Args: {
          say: string
        }
        Returns: string
      }
      get_income_type: {
        Args: {
          p_pattern: string
        }
        Returns: {
          type_name: string
        }[]
      }
      total_amount: {
        Args: {
          table_name: string
          column_name?: string
          start_date?: string
          end_date?: string
        }
        Returns: number
      }
      total_by_month: {
        Args: {
          table_name: string
        }
        Returns: {
          month_date: string
          month_total: number
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
