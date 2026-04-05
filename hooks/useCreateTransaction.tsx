import {
  createTransaction,
  editTransaction,
} from "@/service/repositories/transactionRepository";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetUser } from "./useGetUser";
import { Transaction } from "@/types/transactions/transactions.type";

export function useCreateTransaction() {
  const { user, isLoading } = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const processTransaction = async (data: Transaction) => {
    if (isLoading || !user) {
      return null;
    }

    setIsSubmitting(true);
    try {
      if (data.id !== "" && typeof data.id === "string") {
        await editTransaction(data.id, data, user.id);
        router.dismiss();
      } else {
        const newTransaction = await createTransaction(data, user.id);
        if (newTransaction) {
          router.replace("/(tabs)/history");
        }
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { processTransaction, isSubmitting };
}
