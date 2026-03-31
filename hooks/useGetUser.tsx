import { getUserName } from "@/service/local/service";
import { useEffect, useState } from "react";

export function useGetUser() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userNameRaw = await getUserName();
        const parsedUser = userNameRaw ? JSON.parse(userNameRaw) : null;
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, isLoading };
}
