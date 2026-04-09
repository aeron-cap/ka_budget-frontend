import { getAllBudgets } from "@/service/repositories/budgetRepository";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useGetBudget(limits: string) {
  const { user } = useGetUser();
  return useQuery({
    queryKey: ["savings", limits],
    queryFn: () => getAllBudgets(user?.id || "", limits),
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  });
}
