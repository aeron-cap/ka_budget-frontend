import { getAllBudgets } from "@/service/repositories/budgetRepository";
import { Saving } from "@/types/savings/savings.type";
import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "./useGetUser";

export function useGetBudget(limits: string) {
  const { user, isLoading } = useGetUser();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Saving[]>([]);

  const refetch = useCallback(async () => {
    if (isLoading || !user) return;
    setIsFetching(true);
    try {
      const result = await getAllBudgets(user.id, limits);
      setData(result ?? []);
    } finally {
      setIsFetching(false);
    }
  }, [user, limits, isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { budgetList: data, isFetching, refetch };
}
