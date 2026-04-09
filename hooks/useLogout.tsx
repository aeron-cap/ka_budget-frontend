import { clearLocalUser } from "@/service/local/service";
import { useEffect } from "react";

export function useLogout() {
  useEffect(() => {
    return () => {
      clearLocalUser();
    };
  }, []);
}