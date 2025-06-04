import { useState } from "react";
import AdminContacts from "./components/admin_contact";
import AdminInformations from "./components/AdminInformations/AdminInformations_index";
const AdminDashboard = () => {
  const [view, setView] = useState<"contacts" | "profile">("contacts");

  return (
    <div className=" p-2 flex ">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100 p-4 rounded-lg mr-6 space-y-2 sticky ">
        <button
          onClick={() => setView("contacts")}
          className={`w-full text-left px-3 py-2 rounded ${
            view === "contacts" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Danh sách liên hệ
        </button>
        <button
          onClick={() => setView("profile")}
          className={`w-full text-left px-3 py-2 rounded ${
            view === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Thông tin cá nhân
        </button>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex-1">
        {view === "contacts" && <AdminContacts />}
        {view === "profile" && <AdminInformations />}
      </div>
    </div>
  );
};

export default AdminDashboard;
