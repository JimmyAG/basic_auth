import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../lib/auth/auth-utils";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};
