import { LaunchScreen } from "@/components/splash";
import { useSession } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";


interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
 const { data, isPending } = useSession();


  const signedIn = !!data;


    console.log(useSession())
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
