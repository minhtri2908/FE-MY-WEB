import { useState } from "react";
import { Plus, Pencil, Save, X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../../api";

type Skill = {
  _id: string;
  category: string;
  items: string[];
};
type SkillForm = {
  category: string;
  items: string[];
};

export default function AdminSkillsList({
  skills,
  setskill,
}: {
  skills: Skill[];
  setskill: React.Dispatch<React.SetStateAction<Skill[]>>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<SkillForm>({
    category: "",
    items: [""],
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...skills[index] });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ category: "", items: [""] });
  };

  const handleChangeItem = (i: number, value: string) => {
    const updatedItems = [...formData.items];
    updatedItems[i] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItemField = () => {
    setFormData({ ...formData, items: [...formData.items, ""] });
  };

  const handleRemoveItem = (i: number) => {
    const updatedItems = formData.items.filter((_, idx) => idx !== i);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({ category: "", items: [""] });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        const res = await api.post("/skills", formData);
        setskill([res.data, ...skills]);
        toast.success("Đã thêm kỹ năng mới");
      } else if (editingIndex !== null) {
        const res = await api.put(
          `/skills/${skills[editingIndex]._id}`,
          formData
        );
        const updated = [...skills];
        updated[editingIndex] = res.data;
        setskill(updated);
        toast.success("Cập nhật kỹ năng thành công");
      }
    } catch (err) {
      toast.error("Lỗi khi lưu kỹ năng");
    }
    handleCancel();
  };

  return (
    <div>
      <h2 className="pt-[30px] font-bold text-[1.8rem]">Kỹ năng chuyên môn</h2>
      {skills.map((group, idx) => (
        <section key={idx} className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[1.3rem]">{group.category}</h3>
            <button
              onClick={() => handleEdit(idx)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              <Pencil size={18} /> Chỉnh sửa kỹ năng
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.items.map((item, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm font-mono px-2 py-1 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
      {(isAdding || editingIndex !== null) && (
        <div className="bg-gray-100 p-4 rounded mt-4 space-y-4 text-sm">
          <input
            className="border rounded p-2 w-full"
            placeholder="Tên nhóm kỹ năng"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          {/* Các ô kỹ năng gọn gàng theo hàng */}
          <div className="flex flex-wrap gap-2">
            {formData.items.map((item, i) => (
              <div key={i} className="relative">
                <input
                  className="border rounded p-2 pr-6 text-sm w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px]"
                  placeholder={`Kỹ năng ${i + 1}`}
                  value={item}
                  onChange={(e) => handleChangeItem(i, e.target.value)}
                />
                {formData.items.length > 1 && (
                  <button
                    onClick={() => handleRemoveItem(i)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleAddItemField}
            className="text-blue-600 hover:text-blue-800 text-xs underline"
          >
            + Thêm kỹ năng
          </button>

          <div className="flex gap-2 mt-3">
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
          <Plus size={18} /> Thêm kỹ năng
        </button>
      </div>

      <hr className="mt-6 border-t border-gray-300" />
    </div>
  );
}
