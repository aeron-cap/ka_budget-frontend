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

export function Validator(
  data: Transaction | Saving,
  type: string,
): { errors: string[] } {
  const errors: string[] = [];

  if (type === "Transaction") {
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
        value === null || value === undefined || value === "" || value === "0";

      if (isInvalid) {
        errors.push(`${String(key)} is required`);
      }
    });
  }

  return { errors };
}
