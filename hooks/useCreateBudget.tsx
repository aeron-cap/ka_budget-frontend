import {
  createBugdet,
  editBudget,
} from "@/service/repositories/budgetRepository";
import { Saving } from "@/types/savings/savings.type";
import { useState } from "react";
import { useGetUser } from "./useGetUser";

export function useCreateBudget() {
  const { user, isLoading } = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processBudget = async (data: Saving) => {
    if (isLoading || !user) {
      return null;
    }

    setIsSubmitting(true);
    try {
      if (data.id !== "" && typeof data.id === "string") {
        await editBudget(data.id, data, user.id);
      } else {
        await createBugdet(data, user.id);
      }
    } catch (error) {
      console.error("Error creating budget:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { processBudget, isSubmitting };
}
