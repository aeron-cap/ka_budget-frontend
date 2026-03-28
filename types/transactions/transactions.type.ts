export type Transaction = {
  id: string;
  datetime: string;
  transaction_category: string;
  category_icon: string;
  amount: number;
  note: string;
  transaction_type: string;
  account: string;
  receiving_account: string | null;
  budget_name?: string | null;
  fee?: number | null;
  user_id: number;
  created_at?: string | Date;
  updated_at?: string | Date;
};
