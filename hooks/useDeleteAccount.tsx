import { useGetUser } from "./useGetUser";
import { useState } from "react";
import { router } from "expo-router";
import { deleteAccount } from "@/service/repositories/accountRepository";

export function useDeleteAccount() {
  const { user, isLoading } = useGetUser();
  const [isDeleting, setIsDeleting] = useState(false);

  const removeAccount = async (accountId: string) => {
    if (isLoading || !user) {
      return null;
    }

    setIsDeleting(true);
    try {
      await deleteAccount(accountId, user.id);
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { removeAccount, isDeleting };
}
