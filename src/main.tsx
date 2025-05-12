import { Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'
import "tailwindcss";
import App from "./App.tsx";
import About from "./About/about";
import Story from "./Story/story";
import Hobby from "./Hobby/hobby";
import Work from "./Work/work";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <BrowserRouter>
     <div className="pt-20"> {/* đẩy nội dung xuống dưới navbar */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/story" element={<Story />} />
        <Route path="/hobby" element={<Hobby />} />
        <Route path="/work" element={<Work />} />
      </Routes>
      </div>
    </BrowserRouter>
    <Footer />
  </StrictMode>
);
