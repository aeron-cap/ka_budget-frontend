export type Transaction = {
  id: string;
  datetime: Date;
  transaction_category: string;
  amount: string;
  note: string;
  transaction_type: string;
  transaction_account: string;

  receiving_account?: string | null;
  saving_name?: string | null;
  fee?: string | null;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
};
