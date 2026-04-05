import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetUser } from "./useGetUser";
import { Account } from "@/types/accounts/accounts.type";
import {
  createAccount,
  editAccount,
} from "@/service/repositories/accountRepository";

export function useCreateAccount() {
  const { user, isLoading } = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const processAccount = async (data: Account) => {
    if (isLoading || !user) {
      return null;
    }

    setIsSubmitting(true);
    try {
      if (data.id !== "" && typeof data.id === "string") {
        const editedTransaction = await editAccount(data.id, data, user.id);
        if (editedTransaction) {
          router.back();
        }
      } else {
        const newTransaction = await createAccount(data, user.id);
        if (newTransaction) {
          router.replace("/(tabs)/profile");
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { processAccount, isSubmitting };
}
