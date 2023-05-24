export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      eventIncome: {
        Row: {
          id: number
          incomesID: number
          ministry: string
          nameEvent: string
        }
        Insert: {
          id?: number
          incomesID: number
          ministry: string
          nameEvent: string
        }
        Update: {
          id?: number
          incomesID?: number
          ministry?: string
          nameEvent?: string
        }
      }
      incomes: {
        Row: {
          amount: number | null
          comment: string | null
          concept: string | null
          createdBy: string | null
          createdDate: string | null
          date: string
          id: number
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
          id?: number
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
          id?: number
          updatedBy?: string | null
          updatedDate?: string | null
        }
      }
      incomeType: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type?: string
        }
        Update: {
          id?: number
          type?: string
        }
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
