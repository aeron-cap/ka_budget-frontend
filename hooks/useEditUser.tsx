import { setLocalUser } from "@/service/local/service";
import {
    editUserName,
    getUserUsingName,
} from "@/service/repositories/userRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "./useGetUser";

export function useEditUser() {
  const { data: user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const existingUser = await getUserUsingName(name);
      if (existingUser && existingUser.id !== user?.id) {
        alert("Username already exists. Please choose a different name.");
        return Promise.reject(new Error("Username already exists"));
      } else {
        const editedUserName = await editUserName(name, user?.id);
        if (!editedUserName) {
          alert("Failed to update username. Please try again.");
          return Promise.reject(new Error("Failed to update username"));
        } else {
          setLocalUser(
            editedUserName[0].name,
            editedUserName[0].rand_id,
            editedUserName[0].user_string,
          );
          return editedUserName;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
