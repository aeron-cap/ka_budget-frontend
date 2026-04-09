import { getAllTransactions } from "@/service/repositories/transactionRepository";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useGetTransactions(limits: string) {
  const { user } = useGetUser();
  return useQuery({
    queryKey: ["transactions", limits],
    queryFn: () => getAllTransactions(user?.id || "", limits),
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  });
}
