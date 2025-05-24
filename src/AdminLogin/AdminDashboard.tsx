import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  createdAt: string;
};

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await api.get(`/contacts?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      setContacts(res.data.contacts);
      setTotalPages(res.data.totalPages);
      setError("");
    } catch (err) {
      console.error("Lỗi khi lấy danh sách liên hệ:", err);
      setError("Không thể lấy danh sách liên hệ. Vui lòng đăng nhập lại.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout", null, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      console.error("Lỗi khi logout:", err);
      toast.error("Đăng xuất thất bại");
    }
  };

  const handleDelete = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Bạn có chắc muốn xoá liên hệ này?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // close confirm toast
                const loading = toast.loading("Đang xoá...");

                try {
                  await api.delete(`/contacts/${id}`, {
                    withCredentials: true,
                  });
                  toast.success("Đã xoá liên hệ.", { id: loading });
                  fetchContacts();
                } catch (err) {
                  console.error("Lỗi khi xoá liên hệ:", err);
                  toast.error("Không thể xoá liên hệ.", { id: loading });
                }
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xoá
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm border rounded"
            >
              Huỷ
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  return (
    <div className="p-6">
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
              <th className="py-2 px-4 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="py-2 px-4 border">{contact.name}</td>
                <td className="py-2 px-4 border">{contact.email}</td>
                <td className="py-2 px-4 border">{contact.phone}</td>
                <td className="text-left py-2 px-4 border whitespace-pre-wrap">
                  <ReactMarkdown>{contact.details.replace(/__/g, '\\_\\_')}</ReactMarkdown>
                </td>
                <td className="py-2 px-4 border text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 text-xl"
            aria-label="Trang trước"
          >
            &#60;
          </button>
          <span>
            Trang <strong>{page}</strong> / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 text-xl"
            aria-label="Trang sau"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
