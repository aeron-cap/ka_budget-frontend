import {
  createAccount,
  editAccount,
} from "@/service/repositories/accountRepository";
import { Account } from "@/types/accounts/accounts.type";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useGetUser } from "./useGetUser";

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
        await editAccount(data.id, data, user.id);
      } else {
        await createAccount(data, user.id);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { processAccount, isSubmitting };
}
