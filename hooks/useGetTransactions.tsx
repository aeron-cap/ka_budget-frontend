import { getAllTransactions } from "@/service/repositories/transactionRepository";
import { Transaction } from "@/types/transactions/transactions.type";
import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "./useGetUser";

export function useGetTransactions(limits: string) {
  const { user, isLoading } = useGetUser();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Transaction[]>([]);

  const refetch = useCallback(async () => {
    if (isLoading || !user) return;
    setIsFetching(true);
    try {
      const result = await getAllTransactions(user.id, limits);
      setData(result ?? []);
    } finally {
      setIsFetching(false);
    }
  }, [user, limits, isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { transactionList: data, isFetching, refetch };
}
