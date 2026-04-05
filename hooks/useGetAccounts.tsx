import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "./useGetUser";
import { Account } from "@/types/accounts/accounts.type";
import { getAllAccounts } from "@/service/repositories/accountRepository";

export function useGetAccounts(limits: string) {
  const { user, isLoading } = useGetUser();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Account[]>([]);

  const accountList = async () => {
    if (isLoading || !user) {
      return null;
    }

    setIsFetching(true);
    try {
      const accounts = await getAllAccounts(user.id, limits);
      setData(accounts ?? []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const refetch = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const result = await getAllAccounts(user.id, limits);
      setData(result ?? []);
    } finally {
      setIsFetching(false);
    }
  }, [user, limits]);

  return { accountList: data, isFetching, refetch };
}
