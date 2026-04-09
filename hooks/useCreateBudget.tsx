import {
  createBugdet,
  editBudget,
} from "@/service/repositories/budgetRepository";
import { Saving } from "@/types/savings/savings.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useCreateBudget() {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Saving) => {
      if (data.id) {
        return editBudget(data.id, data, user?.id);
      } else {
        return createBugdet(data, user?.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountsAndBalance"] });
    },
  });
}
