export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      incomes: {
        Row: {
          amount: number | null;
          comment: string | null;
          concept: string | null;
          createdBy: string | null;
          createdDate: string | null;
          date: string;
          eventName: string | null;
          id: number;
          ministryID: number | null;
          tithingID: number | null;
          type: number | null;
          updatedBy: string | null;
          updatedDate: string | null;
        };
        Insert: {
          amount?: number | null;
          comment?: string | null;
          concept?: string | null;
          createdBy?: string | null;
          createdDate?: string | null;
          date: string;
          eventName?: string | null;
          id?: number;
          ministryID?: number | null;
          tithingID?: number | null;
          type?: number | null;
          updatedBy?: string | null;
          updatedDate?: string | null;
        };
        Update: {
          amount?: number | null;
          comment?: string | null;
          concept?: string | null;
          createdBy?: string | null;
          createdDate?: string | null;
          date?: string;
          eventName?: string | null;
          id?: number;
          ministryID?: number | null;
          tithingID?: number | null;
          type?: number | null;
          updatedBy?: string | null;
          updatedDate?: string | null;
        };
      };

      incomeTypes: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name?: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      ministries: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name?: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      tithing: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
