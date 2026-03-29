import { Account } from "@/types/accounts/accounts.type";
import { Saving } from "@/types/savings/savings.type";
import { Transaction } from "@/types/transactions/transactions.type";

const transactionRequiredKeys: (keyof Transaction)[] = [
  "datetime",
  "transaction_category",
  "amount",
  "note",
  "transaction_type",
  "transaction_account",
];

const accountRequiredKeys: (keyof Account)[] = [
  "name",
  "account_type",
  "initial_balance",
  "account_category",
];

const savingRequiredKeys: (keyof Saving)[] = [
  "color",
  "name",
  "account",
  "current_amount",
  "goal_amount",
  "saving_category",
];

export function Validator(
  data: Transaction | Saving | Account,
  type: string,
): { errors: string[] } {
  const errors: string[] = [];

  switch (type) {
    case "Transaction":
      const transactionData = data as Transaction;

      const keysToCheck: (keyof Transaction)[] = [...transactionRequiredKeys];

      if (transactionData.transaction_type === "Transfer") {
        keysToCheck.push("receiving_account", "fee");

        if (
          transactionData.receiving_account &&
          transactionData.receiving_account ===
            transactionData.transaction_account
        ) {
          // keysToCheck.push("saving_name");
        }
      }

      keysToCheck.forEach((key) => {
        const value = transactionData[key];

        const isInvalid =
          value === null ||
          value === undefined ||
          value === "" ||
          value === "0";

        if (isInvalid) {
          errors.push(`${String(key)} is required`);
        }
      });
      break;
    case "Account":
      const accountData = data as Account;

      accountRequiredKeys.forEach((key) => {
        const value = accountData[key];

        const isInvalid = value === null || value === undefined || value === "";

        if (isInvalid) {
          errors.push(`${String(key)} is required`);
        }
      });
      break;
    case "Saving":
      const savingData = data as Saving;

      savingRequiredKeys.forEach((key) => {
        const value = savingData[key];

        const isInvalid = value === null || value === undefined || value === "";

        if (isInvalid) {
          errors.push(`${String(key)} is required`);
        }
      });
      break;
    default:
      errors.push("Invalid transaction type");
  }

  return { errors };
}
