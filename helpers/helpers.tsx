import { accountProviderUI } from "@/constants/uiElements";
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
  "provider",
];

const savingRequiredKeys: (keyof Saving)[] = [
  "color",
  "name",
  "account",
  "initial_amount",
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
        keysToCheck.push("receiving_account");
        keysToCheck.push("receiving_category");
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

export function getGradientColors(
  accountType: string,
  provider: string,
): [string, string] {
  if (!accountType || !provider) {
    return ["#ffffff0d", "#ffffff0d"];
  }

  const uiData = accountProviderUI[
    accountType as keyof typeof accountProviderUI
  ].find((ui) => {
    return ui.name === provider;
  });

  if (uiData) {
    return [uiData.color1, uiData.color2];
  } else {
    return ["#ffffff0d", "#ffffff0d"];
  }
}
