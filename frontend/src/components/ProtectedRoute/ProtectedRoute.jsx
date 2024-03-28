import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const user = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/", { replace: true });
      toast.error("You are not authorized to access this page.");
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
