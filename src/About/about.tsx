import { useEffect, useState } from "react";
import api from "../api.ts";
import { marked } from "marked";
import { FileDown } from "lucide-react";
const renderer = new marked.Renderer();
renderer.link = ({ href, text }) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="underline text-black-600 hover:text-blue-800">${text}</a>`;
};
import Spinner from "../Loading_spinner/Spinner.tsx";

marked.setOptions({ renderer });

export default function About() {
  const tags = ["Code", "Photograph"];
  type Experience = {
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

  type Education = {
    degree: string;
    school: string;
    university: string;
    major: string;
    batch: string;
  };
  type Skill = {
    category: string;
    items: string[];
  };
  type AdminProfile = {
    name: string;
    jobTitle: string;
    about: string;
    cvLink: string;
  };

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [educationsLoading, setEducationsLoading] = useState(true);
  useEffect(() => {
    api
      .get("/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Error fetching skills:", err))
      .finally(() => setSkillsLoading(false));
  }, []);

  useEffect(() => {
    api
      .get("/experiences")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error("Error fetching experiences:", err))
      .finally(() => setExperiencesLoading(false));
  }, []);

  useEffect(() => {
    api
      .get("/educations")
      .then((res) => setEducations(res.data))
      .catch((err) => console.error("Error fetching educations:", err))
      .finally(() => setEducationsLoading(false));
  }, []);
  useEffect(() => {
    api
      .get("/admin/public-profile")
      .then((res) => setAdmin(res.data))
      .catch((err) => console.error("Error fetching admin profile:", err))
      .finally(() => setAdminLoading(false));
  }, []);

  return (
    <>
      <article className="block items-center justify-between mx-auto w-full max-w-[760px]">
        <h1 className="flex text-[2.625rem] font-bold mb-4">Giới thiệu</h1>
        <figure className="max-w-full pb-[65px]">
          <img
            src="/image/IMG_5075-2.jpg"
            alt="Ảnh minh họa"
            className="w-full rounded-md shadow "
          />
        </figure>
        <div className="post-content-article text-[1.7rem]">
          <div className="w-full flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="flex">
                <strong className="text-[1.7rem]">
                  {adminLoading ? "..." : admin?.name}
                </strong>
              </h2>
              <div className="pt-[10px] flex items-center flex-wrap gap-2">
                <span className="font-semibold text-lg">
                  {adminLoading ? "..." : admin?.jobTitle}
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
            <p>{adminLoading ? "Đang tải..." : admin?.about}</p>
          </blockquote>

          {/* PHẦN HIỂN THỊ KINH NGHIỆM */}
          <h2 className="flex pt-[30px] font-bold text-[1.8rem]">
            Kinh nghiệm
          </h2>
          {experiencesLoading ? (
            <Spinner />
          ) : (
            experiences.map((exp, idx) => (
              <section key={idx} className="mt-4">
                <h3 className="flex text-[1.5rem] font-semibold">
                  {exp.company}
                </h3>
                <ul className="mt-2 space-y-2">
                  {exp.positions.map((pos, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[1rem] pt-3"
                    >
                      <span className="font-medium">{pos.title}</span>
                      <span className="bg-gray-200 text-xs font-mono px-2 py-0.5 rounded">
                        {pos.start} – {pos.end}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* <p className="text-sm mt-2 text-blue-600 underline">
                <a href={exp.link} target="_blank" rel="noreferrer">
                  {exp.link}
                </a>
              </p> */}
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
            ))
          )}
          {/* PHẦN KỸ NĂNG */}
          <h2 className="flex pt-[30px] font-bold text-[1.8rem]">
            Kỹ năng chuyên môn
          </h2>
          {skillsLoading ? (
            <Spinner />
          ) : (
            skills.map((group, idx) => (
              <section key={idx} className="mt-4">
                <h3 className="flex font-bold text-[1.3rem]">
                  {group.category}
                </h3>
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
            ))
          )}
          <hr className="mt-2 border-t border-gray-300" />
          {/* PHẦN HIỂN THỊ GIÁO DỤC */}
          <h2 className="flex pt-[30px] font-bold text-[1.8rem]">Giáo dục</h2>
          {educationsLoading ? (
            <Spinner />
          ) : (
            educations.map((edu, idx) => (
              <section key={idx} className="mt-4">
                <h3 className="flex text-lg font-bold">{edu.degree}</h3>
                <p className="text-[1rem] font-semibold flex mt-2">
                  {edu.school}
                  <span className="font-normal ml-1">({edu.university})</span>
                </p>
                <p className="text-[1rem] flex italic mt-2">
                  Chuyên ngành{" "}
                  <span className="ml-1 font-semibold">{edu.major}</span>,{" "}
                  {edu.batch}
                </p>
                <hr className="mt-2 border-t border-gray-300" />
              </section>
            ))
          )}
        </div>
      </article>
    </>
  );
}
