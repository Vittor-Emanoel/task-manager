import { createContext, useEffect } from "react";
import { toast } from "react-hot-toast";

import { LaunchScreen } from "@/components/splash";
import type { User } from "@/entities/User";
import { signOut, useSession } from "@/lib/auth";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  isLoadingUser: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending, error } = useSession();

  const signedIn = !!data?.user;

  useEffect(() => {
    if (error) {
      toast.error("Sua sessão expirou!");
      signOut();
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: signedIn,
        user: data?.user,
        isLoadingUser: isPending,
      }}
    >
      <LaunchScreen isLoading={isPending} />

      {!isPending && children}
    </AuthContext.Provider>
  );
}
