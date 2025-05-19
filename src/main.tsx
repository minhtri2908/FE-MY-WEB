import { Routes, Route, useLocation } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import './index.css'
import App from "./App.tsx";
import About from "./About/about";
import Story from "./Story/story";
import Hobby from "./Hobby/hobby";
import Work from "./Work/work";
import AdminLogin from "./AdminLogin/AdminLogin.tsx";
import AdminDashboard from "./AdminLogin/AdminDashboard"; 
const Root = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={`pt-20 w-full max-w-screen overflow-x-hidden px-4`}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/hobby" element={<Hobby />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);
