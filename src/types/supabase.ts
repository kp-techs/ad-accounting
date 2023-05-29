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
      incomes: {
        Row: {
          amount: number | null
          comment: string | null
          createdBy: string | null
          createdDate: string | null
          date: string
          eventName: string | null
          id: number
          ministryID: number | null
          tithingID: number | null
          type: string | null
          updatedBy: string | null
          updatedDate: string | null
        }
        Insert: {
          amount?: number | null
          comment?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date: string
          eventName?: string | null
          id?: number
          ministryID?: number | null
          tithingID?: number | null
          type?: string | null
          updatedBy?: string | null
          updatedDate?: string | null
        }
        Update: {
          amount?: number | null
          comment?: string | null
          createdBy?: string | null
          createdDate?: string | null
          date?: string
          eventName?: string | null
          id?: number
          ministryID?: number | null
          tithingID?: number | null
          type?: string | null
          updatedBy?: string | null
          updatedDate?: string | null
        }
      }
      incomeType: {
        Row: {
          type: string
        }
        Insert: {
          type?: string
        }
        Update: {
          type?: string
        }
      }
      ministries: {
        Row: {
          id: number
          ministry: string
        }
        Insert: {
          id?: number
          ministry?: string
        }
        Update: {
          id?: number
          ministry?: string
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
