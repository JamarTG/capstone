import type { authTypes } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";

const useSetUser = (isSuccess: boolean, setUser:Dispatch<SetStateAction<authTypes.AuthUser | null>>, data: any) => {
  useEffect(() => {
    if (isSuccess && data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [isSuccess, data]);
};

export default useSetUser;
