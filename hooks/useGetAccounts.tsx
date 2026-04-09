import { getAllAccounts } from "@/service/repositories/accountRepository";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useGetAccounts(limits: string) {
  const { user } = useGetUser();
  return useQuery({
    queryKey: ["accounts", limits],
    queryFn: () => getAllAccounts(user?.id || "", limits),
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
  });
}
