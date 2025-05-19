import { useEffect, useState,ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const RequireAdminAuth = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/admin/check-auth", { withCredentials: true });
        setLoading(false);
      } catch {
        navigate("/admin/login");
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;

  return children;
};

export default RequireAdminAuth;
