import { useEffect } from "react";
import { useRouter } from "next/router";
import isAuthenticated from "../constants/isAuthenticated";
import { useReactiveVar } from "@apollo/client";

interface AuthGuardProps {
  children: React.ReactNode;
  excludedRoutes?: string[];
}

const AuthGuard = ({ children, excludedRoutes }: AuthGuardProps) => {
  const router = useRouter();
  const authenticated = useReactiveVar(isAuthenticated);
  useEffect(() => {
    if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
      router.push("/login");
    }
  }, [authenticated, router, excludedRoutes]);

  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? children : <>{children}</>}
    </>
  );
};

export default AuthGuard;
