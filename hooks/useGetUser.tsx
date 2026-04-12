import { getLocalUser } from "@/service/local/service";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const localUser = await getLocalUser();
      if (localUser) {
        return JSON.parse(localUser);
      } else {
        return null;
      }
    },
  });
}
