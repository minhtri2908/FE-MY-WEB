import { Plus, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

 type Education = {
    degree: string;
    school: string;
    university: string;
    major: string;
    batch: string;
  };

export default function AdminEducationsList({
  educations,
 seteducation,
}: {
  educations: Education[];
  seteducation: React.Dispatch<React.SetStateAction<Education[]>>;
}) {
  return (
    <div>
      <h2 className="flex pt-[30px] font-bold text-[1.8rem]">Giáo dục</h2>
      {educations.map((edu, idx) => (
        <section key={idx} className="mt-4">
          <h3 className="flex text-lg font-bold">{edu.degree}</h3>
          <p className="text-[1rem] font-semibold flex mt-2">
            {edu.school}
            <span className="font-normal ml-1">({edu.university})</span>
          </p>
          <p className="text-[1rem] flex italic mt-2">
            Chuyên ngành <span className="ml-1 font-semibold">{edu.major}</span>
            , {edu.batch}
          </p>
          <hr className="mt-2 border-t border-gray-300" />
        </section>
      ))}
      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            toast("Chức năng thêm bằng cấp chưa được triển khai")
          }
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Plus size={18} /> Thêm bằng cấp
        </button>
      </div>
    </div>
    
  );
}
