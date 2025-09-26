import { LaunchScreen } from "@/components/splash";
import { createAuthClient } from "better-auth/react";
import { Navigate, Outlet } from "react-router-dom";
const { useSession } = createAuthClient();

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { data, isPending = true } = useSession();

  const signedIn = !!data;

  if (isPending) {
    return <LaunchScreen isLoading={isPending} />;
  }
  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
