import {
  createAccount,
  editAccount,
} from "@/service/repositories/accountRepository";
import { Account } from "@/types/accounts/accounts.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useCreateAccount() {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Account) => {
      if (data.id) {
        return editAccount(data.id, data, user?.id);
      } else {
        return createAccount(data, user?.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      queryClient.invalidateQueries({ queryKey: ["accountsAndBalance"] });
    },
  });
}
