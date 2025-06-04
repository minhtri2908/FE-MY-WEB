// components/AdminInformations/AdminProfileCard.tsx
import { useEffect, useState } from "react";
import { FileDown, Plus, Save, X } from "lucide-react";

import { toast } from "react-hot-toast";
import api from "../../../api";
type AdminProfile = {
  name: string;
  jobTitle: string;
  about: string;
  cvLink: string;
};
export default function AdminProfileCard({
  admin,
  setAdmin,
  loading,
}: {
  admin: AdminProfile;
  setAdmin: React.Dispatch<React.SetStateAction<AdminProfile | null>>;
  loading: boolean; // thêm prop nếu cần
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(admin);
  const [isSaving, setIsSaving] = useState(false); // trạng thái đang lưu

  const handleSave = async () => {
    if (isSaving) return; // tránh click nhiều lần
    setIsSaving(true);
    try {
      const res = await api.put("/admin/update-profile", edited);
      setAdmin(res.data.admin);
      toast.success("Cập nhật thành công!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Cập nhật thất bại.");
    } finally {
      setIsSaving(false);
    }
  };
  useEffect(() => {
    setEdited(admin);
  }, [admin]);
  const tags = ["Code", "Photograph"];

  return (
    <section className="space-y-4">
      <div className="w-full flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="flex">
            <strong className="text-[1.7rem]">
              {loading ? "..." : admin?.name}
            </strong>
          </h2>
          <div className="pt-[10px] flex items-center flex-wrap gap-2">
            <span className="font-semibold text-lg">
              {loading ? "..." : admin?.jobTitle}
            </span>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm font-mono px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {admin?.cvLink && (
          <a
            href={admin.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Download CV
            <FileDown className="w-4 h-4" />
          </a>
        )}
      </div>
      <hr className="mt-2 border-t border-gray-300" />
      <h2>
        <strong className="flex pt-[50px]">Đôi Lời</strong>
      </h2>
      <blockquote className="border-l-4 text-[1.2rem] border-blue-400 pl-4 italic text-gray-700 px-5 py-2.5 m-[40px]">
        <p>{loading ? "Đang tải..." : admin?.about}</p>
      </blockquote>
      {!isEditing ? (
        <>
          <button
            onClick={() => {
              setIsEditing(true);
              setEdited(admin);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 border px-3 py-1 rounded-full text-sm"
          >
            <Plus size={16} /> Chỉnh sửa thông tin
          </button>
        </>
      ) : (
        <div className="space-y-3 bg-gray-100 p-4 rounded text-sm ">
          <input
            className="w-full p-2 rounded border"
            value={edited.name}
            onChange={(e) => setEdited({ ...edited, name: e.target.value })}
            placeholder="Họ và tên"
          />
          <input
            className="w-full p-2 rounded border"
            value={edited.jobTitle}
            onChange={(e) => setEdited({ ...edited, jobTitle: e.target.value })}
            placeholder="Công việc"
          />
          <textarea
            className="w-full p-2 rounded border"
            rows={4}
            value={edited.about}
            onChange={(e) => setEdited({ ...edited, about: e.target.value })}
            placeholder="Giới thiệu"
          />
          <input
            className="w-full p-2 rounded border"
            value={edited.cvLink}
            onChange={(e) => setEdited({ ...edited, cvLink: e.target.value })}
            placeholder="CV Link"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Save size={16} /> Lưu
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEdited(admin);
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded flex items-center gap-1"
            >
              <X size={16} /> Hủy
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
