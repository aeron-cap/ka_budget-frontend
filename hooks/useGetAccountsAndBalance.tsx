import { getAccountsAndBalance } from "@/service/repositories/accountRepository";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useGetAccountsAndBalance() {
  const { data: user } = useGetUser();
  return useQuery({
    queryKey: ["accountsAndBalance"],
    queryFn: () => getAccountsAndBalance(user?.id || ""),
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  });
}
