import {
  createTransaction,
  editTransaction,
} from "@/service/repositories/transactionRepository";
import { Transaction } from "@/types/transactions/transactions.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useCreateTransaction() {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Transaction) => {
      if (data.id) {
        return editTransaction(data.id, data, user?.id);
      } else {
        return createTransaction(data, user?.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
