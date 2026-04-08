export type Transaction = {
  id: string;
  datetime: Date;
  transaction_category: string;
  amount: string;
  note: string | null;
  transaction_type: string;
  transaction_account: string;

  receiving_account?: string | null;
  receiving_category?: string | null;
  saving_name?: string | null;
  fee?: string | null;
};

export type TransactionDetails = {
  user_id: string;
  account: string;
  category: string;
};
