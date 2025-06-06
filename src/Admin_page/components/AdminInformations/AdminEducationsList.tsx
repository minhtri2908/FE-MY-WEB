import { useState } from "react";
import { Plus, Pencil, Save, X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../../api";

type Education = {
  _id: string;
  degree: string;
  school: string;
  university: string;
  major: string;
  batch: string;
};
type EducationForm = Omit<Education, "_id">;

export default function AdminEducationsList({
  educations,
  seteducation,
}: {
  educations: Education[];
  seteducation: React.Dispatch<React.SetStateAction<Education[]>>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<EducationForm>({
    degree: "",
    school: "",
    university: "",
    major: "",
    batch: "",
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...educations[index] });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      degree: "",
      school: "",
      university: "",
      major: "",
      batch: "",
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({
      degree: "",
      school: "",
      university: "",
      major: "",
      batch: "",
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        const res = await api.post("/educations", formData);
        seteducation([res.data, ...educations]);
        toast.success("Đã thêm bằng cấp");
      } else if (editingIndex !== null) {
        const res = await api.put(
          `/educations/${educations[editingIndex]._id}`,
          formData
        );
        const updated = [...educations];
        updated[editingIndex] = res.data.education;
        seteducation(updated);
        toast.success("Cập nhật bằng cấp thành công");
      }
    } catch (err) {
      toast.error("Lỗi khi lưu bằng cấp");
    }
    handleCancel();
  };

  return (
    <div>
      <h2 className="flex pt-[30px] font-bold text-[1.8rem]">Giáo dục</h2>
      {educations.map((edu, idx) => (
        <section key={idx} className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{edu.degree}</h3>
            <button
              onClick={() => handleEdit(idx)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1 border border-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              <Pencil size={16} /> Chỉnh sửa
            </button>
          </div>
          <p className="flex text-[1rem] font-semibold mt-2">
            {edu.school}{" "}
            <span className="font-normal ml-1">({edu.university})</span>
          </p>
          <p className="flex text-[1rem] italic mt-2">
            Chuyên ngành <span className="ml-1 font-semibold">{edu.major}</span>
            , {edu.batch}
          </p>
          <hr className="mt-2 border-t border-gray-300" />
        </section>
      ))}

      {(isAdding || editingIndex !== null) && (
        <div className="bg-gray-100 p-4 rounded mt-4 space-y-3 text-sm">
          {["degree", "school", "university", "major", "batch"].map((field) => (
            <input
              key={field}
              className="border rounded p-2 w-full"
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={(formData as any)[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
            />
          ))}

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Save size={16} /> Lưu
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded flex items-center gap-1"
            >
              <X size={16} /> Hủy
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Plus size={18} /> Thêm bằng cấp
        </button>
      </div>
    </div>
  );
}
