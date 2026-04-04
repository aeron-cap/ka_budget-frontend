import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "./useGetUser";
import { getAllTransactions } from "@/service/repositories/transactionRepository";
import { Transaction } from "@/types/transactions/transactions.type";

export function useGetTransactions(limits: string) {
  const { user, isLoading } = useGetUser();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Transaction[]>([]);

  const transactionList = async () => {
    if (isLoading || !user) {
      return null;
    }

    setIsFetching(true);
    try {
      const transactions = await getAllTransactions(user.id, limits);
      setData(transactions ?? []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const refetch = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const result = await getAllTransactions(user.id, limits);
      setData(result ?? []);
    } finally {
      setIsFetching(false);
    }
  }, [user, limits]);

  return { transactionList: data, isFetching, refetch };
}
