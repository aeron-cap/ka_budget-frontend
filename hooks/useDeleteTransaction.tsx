import { useGetUser } from "./useGetUser";
import { useState } from "react";
import { router } from "expo-router";
import { deleteTransaction } from "@/service/repositories/transactionRepository";

export function useDeleteTransaction() {
  const { user, isLoading } = useGetUser();
  const [isDeleting, setIsDeleting] = useState(false);

  const removeTransaction = async (transactionId: string) => {
    if (isLoading || !user) {
      return null;
    }

    setIsDeleting(true);
    try {
      await deleteTransaction(transactionId, user.id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { removeTransaction, isDeleting };
}
