// components/AdminExperienceList.tsx
import { useState } from "react";
import { Plus, Pencil, Save, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { marked } from "marked";
import api from "../../../api";

type Experience = {
  _id: string;
  company: string;
  positions: { title: string; start: string; end: string }[];
  description: string;
  link: string;
  detail: string;
};

export default function AdminExperienceList({
  experiences,
  setExperiences,
}: {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = async (exp: Experience, isNew = false) => {
    try {
      const { _id, ...data } = exp;
      const response = isNew
        ? await api.post("/experiences", data)
        : await api.put(`/experiences/${_id}`, data);
      const updated = isNew
        ? [response.data, ...experiences]
        : experiences.map((e, i) => (i === editingIndex ? response.data : e));
      setExperiences(updated);
      toast.success(isNew ? "Thêm thành công!" : "Cập nhật thành công!");
    } catch {
      toast.error("Lỗi khi lưu!");
    }
    setIsAdding(false);
    setEditingIndex(null);
  };

  return (
    <div>
      <h2 className="pt-[30px] font-bold text-[1.8rem]">Kinh nghiệm</h2>

      {experiences.map((exp, idx) =>
        editingIndex === idx ? (
          <ExperienceForm
            key={exp._id}
            initial={exp}
            onCancel={() => setEditingIndex(null)}
            onSave={(updated) => handleSave(updated)}
          />
        ) : (
          <section key={idx} className="mt-4">
            <div className="flex justify-between">
              <h3 className="text-[1.5rem] font-semibold">{exp.company}</h3>
              <button
                onClick={() => setEditingIndex(idx)}
                className="text-gray-500 hover:text-black"
              >
                <Pencil size={18} />
              </button>
            </div>
            <ul className="flex mt-2 space-y-2">
              {exp.positions.map((pos, i) => (
                <li key={i} className="text-[1rem] pt-3">
                  <span className="font-medium">{pos.title}</span>{" "}
                  <span className="bg-gray-200 text-xs font-mono px-2 py-0.5 rounded">
                    {pos.start} – {pos.end}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="text-justify mt-2 text-[1rem] text-gray-700"
              dangerouslySetInnerHTML={{ __html: marked(exp.description) }}
            />
            <p
              className="text-justify mt-1 text-[1rem] text-gray-700 pt-3"
              dangerouslySetInnerHTML={{ __html: marked(exp.detail) }}
            />
            <hr className="mt-2 border-t border-gray-300 p-1" />
          </section>
        )
      )}

      {isAdding && (
        <ExperienceForm
          initial={{
            _id: "",
            company: "",
            positions: [{ title: "", start: "", end: "" }],
            description: "",
            link: "",
            detail: "",
          }}
          onCancel={() => setIsAdding(false)}
          onSave={(newExp) => handleSave(newExp, true)}
        />
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Plus size={18} /> Thêm kinh nghiệm
        </button>
      </div>
    </div>
  );
}

// Subcomponent tách form chung để chỉnh sửa và thêm mới
function ExperienceForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Experience;
  onCancel: () => void;
  onSave: (data: Experience) => void;
}) {
  const [data, setData] = useState<Experience>({ ...initial });

  const updatePosition = (index: number, field: keyof Experience["positions"][0], value: string) => {
    const updated = [...data.positions];
    updated[index][field] = value;
    setData({ ...data, positions: updated });
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg space-y-4 text-sm">
      <input
        className="border rounded p-2 w-full"
        placeholder="Tên công ty"
        value={data.company}
        onChange={(e) => setData({ ...data, company: e.target.value })}
      />

      {data.positions.map((pos, idx) => (
        <div key={idx} className="border p-3 rounded bg-white space-y-2">
          <label className="block font-semibold">Vị trí {idx + 1}</label>
          <input
            className="border rounded p-2 w-full"
            placeholder="Chức danh"
            value={pos.title}
            onChange={(e) => updatePosition(idx, "title", e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="border rounded p-2 w-full"
              placeholder="Bắt đầu"
              value={pos.start}
              onChange={(e) => updatePosition(idx, "start", e.target.value)}
            />
            <input
              className="border rounded p-2 w-full"
              placeholder="Kết thúc"
              value={pos.end}
              onChange={(e) => updatePosition(idx, "end", e.target.value)}
            />
          </div>
          {data.positions.length > 1 && (
            <button
              onClick={() =>
                setData({
                  ...data,
                  positions: data.positions.filter((_, i) => i !== idx),
                })
              }
              className="text-red-500 hover:text-red-700 text-xs underline"
            >
              🗑 Xoá vị trí này
            </button>
          )}
        </div>
      ))}

      <button
        onClick={() =>
          setData({
            ...data,
            positions: [...data.positions, { title: "", start: "", end: "" }],
          })
        }
        className="text-blue-600 hover:text-blue-800 text-sm underline"
      >
        ➕ Thêm vị trí
      </button>

      <textarea
        className="border rounded p-2 w-full"
        rows={3}
        placeholder="Mô tả"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <textarea
        className="border rounded p-2 w-full"
        rows={3}
        placeholder="Chi tiết"
        value={data.detail}
        onChange={(e) => setData({ ...data, detail: e.target.value })}
      />

      <div className="flex gap-2">
        <button
          onClick={() => onSave(data)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <Save size={16} /> Lưu
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded flex items-center gap-1"
        >
          <X size={16} /> Hủy
        </button>
      </div>
    </div>
  );
}
