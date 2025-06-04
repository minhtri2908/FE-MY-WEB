
import { Plus, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

type Skill = {
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
  return (
    <div>
      <h2 className="flex pt-[30px] font-bold text-[1.8rem]">
        Kỹ năng chuyên môn
      </h2>

      {skills.map((group, idx) => (
        <section key={idx} className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[1.3rem]">{group.category}</h3>
            <button
              onClick={() =>
                toast("Chức năng chỉnh sửa kỹ năng chưa được triển khai")
              }
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

      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            toast("Chức năng thêm kỹ năng chưa được triển khai")
          }
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Plus size={18} /> Thêm kỹ năng
        </button>
      </div>

      <hr className="mt-6 border-t border-gray-300" />
    </div>
  );
}
