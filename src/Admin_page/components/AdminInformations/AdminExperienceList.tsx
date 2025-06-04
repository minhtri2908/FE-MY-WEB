import { useState } from "react";
import { Plus, Save, X, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { marked } from "marked"; // ✅ Đảm bảo thư viện này đã cài đặt
import api from "../../../api";

type Experience = {
  _id: string;
  company: string;
  positions: {
    title: string;
    start: string;
    end: string;
  }[];
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
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  const [editedExperience, setEditedExperience] = useState<Experience | null>(null);
  return (
    <div>
      <h2 className="flex pt-[30px] font-bold text-[1.8rem]">Kinh nghiệm</h2>

      {experiences.map((exp, idx) => (
        <section key={idx} className="mt-4">
          <div className="flex justify-between items-start">
            {editingExperienceIndex === idx && editedExperience ? (
              <input
                className="text-[1.5rem] font-semibold border rounded p-2 w-full"
                value={editedExperience.company}
                placeholder="Tên công ty"
                onChange={(e) =>
                  setEditedExperience({
                    ...editedExperience,
                    company: e.target.value,
                  })
                }
              />
            ) : (
              <h3 className="flex text-[1.5rem] font-semibold">{exp.company}</h3>
            )}

            <button
              onClick={() => {
                if (editingExperienceIndex === idx) {
                  setEditingExperienceIndex(null);
                  setEditedExperience(null);
                } else {
                  setEditingExperienceIndex(idx);
                  setEditedExperience({ ...exp });
                }
              }}
              className="text-gray-500 hover:text-black"
            >
              <Pencil size={18} />
            </button>
          </div>

          {editingExperienceIndex === idx && editedExperience ? (
            <div className="mt-2 p-4 space-y-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
              {editedExperience.positions.map((pos, posIdx) => (
                <div key={posIdx} className="border p-3 rounded-md bg-white space-y-2">
                  <label className="block text-sm font-semibold">
                    Vị trí {posIdx + 1}
                  </label>
                  <input
                    className="border rounded p-2 w-full text-sm"
                    placeholder="Chức danh"
                    value={pos.title}
                    onChange={(e) => {
                      const newPositions = [...editedExperience.positions];
                      newPositions[posIdx].title = e.target.value;
                      setEditedExperience({
                        ...editedExperience,
                        positions: newPositions,
                      });
                    }}
                  />
                  <div className="flex gap-2">
                    <input
                      className="border rounded p-2 w-full text-sm"
                      placeholder="Bắt đầu"
                      value={pos.start}
                      onChange={(e) => {
                        const newPositions = [...editedExperience.positions];
                        newPositions[posIdx].start = e.target.value;
                        setEditedExperience({
                          ...editedExperience,
                          positions: newPositions,
                        });
                      }}
                    />
                    <input
                      className="border rounded p-2 w-full text-sm"
                      placeholder="Kết thúc"
                      value={pos.end}
                      onChange={(e) => {
                        const newPositions = [...editedExperience.positions];
                        newPositions[posIdx].end = e.target.value;
                        setEditedExperience({
                          ...editedExperience,
                          positions: newPositions,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold">Mô tả</label>
                <textarea
                  className="border rounded p-2 w-full text-sm"
                  rows={4}
                  value={editedExperience.description}
                  onChange={(e) =>
                    setEditedExperience({
                      ...editedExperience,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Chi tiết</label>
                <textarea
                  className="border rounded p-2 w-full text-sm"
                  rows={4}
                  value={editedExperience.detail}
                  onChange={(e) =>
                    setEditedExperience({
                      ...editedExperience,
                      detail: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 mt-2 text-sm">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
                  onClick={async () => {
                    if (editingExperienceIndex !== null && editedExperience) {
                      try {
                        const { _id, ...dataToUpdate } = editedExperience;
                        const response = await api.put(
                          `/experiences/${_id}`,
                          dataToUpdate
                        );
                        const updated = [...experiences];
                        updated[editingExperienceIndex] = response.data;
                        setExperiences(updated);
                        toast.success("Cập nhật thành công!");
                      } catch (err) {
                        console.error("Lỗi khi cập nhật experience:", err);
                        toast.error("Lỗi khi cập nhật!");
                      }
                    }
                    setEditingExperienceIndex(null);
                    setEditedExperience(null);
                  }}
                >
                  <Save size={16} /> Lưu
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded flex items-center gap-1"
                  onClick={() => {
                    setEditingExperienceIndex(null);
                    setEditedExperience(null);
                  }}
                >
                  <X size={16} /> Hủy
                </button>
              </div>
            </div>
          ) : (
            <>
              <ul className="mt-2 space-y-2">
                {exp.positions.map((pos, i) => (
                  <li key={i} className="flex items-center gap-2 text-[1rem] pt-3">
                    <span className="font-medium">{pos.title}</span>
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
            </>
          )}
          <hr className="mt-2 border-t border-gray-300 p-1" />
        </section>
      ))}

      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            toast("Chức năng thêm kinh nghiệm chưa được triển khai")
          }
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Plus size={18} /> Thêm kinh nghiệm
        </button>
      </div>
    </div>
  );
}
