export interface Transaction {
  id: string;
  dateTime: string | Date;
  transaction_category_id: number;
  transaction_category_name: string;
  amount: number;
  transaction_name: string;
  transaction_note: string;
  transaction_type_id: number;
  transaction_type_name: string;
  account_to_deduct_id?: number | null;
  account_to_deduct_name?: string | null;
  account_to_add_id?: number | null;
  account_to_add_name?: string | null;
  budget_id?: number | null;
  budget_name?: string | null;
  number_of_installment?: number | null;
  total_installment_amount?: number | null;
  fee?: number | null;
  user_id: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
