import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contacts/", {
          withCredentials: true,
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách liên hệ:", err);
        setError("Không thể lấy danh sách liên hệ. Vui lòng đăng nhập lại.");
      }
    };

    fetchContacts();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout", null, {
        withCredentials: true,
      });
      navigate("/admin/login");
    } catch (err) {
      console.error("Lỗi khi logout:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách liên hệ</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Họ tên</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">SĐT</th>
              <th className="py-2 px-4 border">Chi tiết</th>
              <th className="py-2 px-4 border">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: any, index: number) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{contact.name}</td>
                <td className="py-2 px-4 border">{contact.email}</td>
                <td className="py-2 px-4 border">{contact.phone}</td>
                <td className="py-2 px-4 border">{contact.details}</td>
                <td className="py-2 px-4 border text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
