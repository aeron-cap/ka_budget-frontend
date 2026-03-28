export type Transaction = {
  id: string;
  datetime: string;
  transaction_category: string;
  category_icon: string;
  amount: string;
  note: string;
  transaction_type: string;
  account: string;
  receiving_account: string | null;
  budget_name?: string | null;
  fee?: string | null;
  user_id: string;
  created_at?: string | Date;
  updated_at?: string | Date;
};
