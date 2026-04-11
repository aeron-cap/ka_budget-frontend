export type Account = {
  id: string;
  name: string;
  account_type: string;
  initial_balance: string;
  current_balance: string | null;
  show_in_home?: boolean | null;
  provider: string | null;
};
