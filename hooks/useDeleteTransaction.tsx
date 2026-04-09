import { deleteTransaction } from "@/service/repositories/transactionRepository";
import { Transaction } from "@/types/transactions/transactions.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useDeleteTransaction() {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Transaction) => {
      if (!user.id) {
        throw new Error("User not found");
      }
      return await deleteTransaction(data.id, user?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
    },
  });
}
