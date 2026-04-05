export type Account = {
  id: string;
  name: string;
  account_type: string;
  initial_balance: string;
  current_balance: string | null;
  account_category: string;
  color: string;
};

export type AccountInHome = {
  accounts: Account[];
};
