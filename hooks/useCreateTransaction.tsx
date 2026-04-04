import { createTransaction } from "@/service/repositories/transactionRepository";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetUser } from "./useGetUser";

export function useCreateTransaction() {
  const { user, isLoading } = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const processTransaction = async (data: any) => {
    if (isLoading || !user) {
      return null;
    }

    setIsSubmitting(true);
    try {
      await createTransaction(data, user.id);

      router.replace("/(tabs)/history");
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { processTransaction, isSubmitting };
}
