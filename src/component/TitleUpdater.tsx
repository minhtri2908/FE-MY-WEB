import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
      "/": "Trang chủ",
      "/about": "Giới thiệu",
      "/contact": "Liên hệ",
      "/projects": "Dự án",
      "/blog": "Bài viết",
      "/story": "Câu chuyện",
      "/hobby": "Sở thích",
      "/work": "Công việc",
      "/admin/login": "Đăng nhập quản trị",
      "/admin/dashboard": "Quản trị"
    };

    const pageTitle = titleMap[path as keyof typeof titleMap] || "Trang phụ";
    document.title = `${pageTitle} | Phạm Minh Trí`;
  }, [location.pathname]);

  return null;
};

export default TitleUpdater;
