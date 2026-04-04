export type Transaction = {
  id: string;
  datetime: Date;
  transaction_category: string;
  amount: string;
  note: string | null;
  transaction_type: string;
  transaction_account: string;

  receiving_account?: string | null;
  saving_name?: string | null;
  fee?: string | null;
};
