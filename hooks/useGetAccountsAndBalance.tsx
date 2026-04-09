import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";
import { getAccountsAndBalance } from "@/service/repositories/accountRepository";

export function useGetAccountsAndBalance() {
  const { user } = useGetUser();
  return useQuery({
    queryKey: ["accountsAndBalance"],
    queryFn: () => getAccountsAndBalance(user?.id || ""),
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  })
}