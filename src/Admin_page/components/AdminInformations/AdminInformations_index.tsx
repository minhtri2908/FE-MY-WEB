import { useEffect, useState } from "react";
import api from "../../../api.ts";
import { marked } from "marked";
import AdminProfileCard from "./AdminProfileCard.tsx";
import AdminExperienceList from "./AdminExperienceList.tsx";
import AdminSkillsList from "./AdminSkillList.tsx";
import AdminEducationsList from "./AdminEducationsList.tsx";
const renderer = new marked.Renderer();
renderer.link = ({ href, text }) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="underline text-black-600 hover:text-blue-800">${text}</a>`;
};
import Spinner from "../../../Loading_spinner/Spinner.tsx";

marked.setOptions({ renderer });
export default function AdminInformations() {
  type Experience = {
    _id: string; // thêm dòng này
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
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [educations, setEducations] = useState<Education[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [educationsLoading, setEducationsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [skillRes, expRes, eduRes, adminRes] = await Promise.all([
          api.get("/skills"),
          api.get("/experiences"),
          api.get("/educations"),
          api.get("/admin/public-profile"),
        ]);
        setSkills(skillRes.data);
        setExperiences(expRes.data);
        setEducations(eduRes.data);
        setAdmin(adminRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setSkillsLoading(false);
        setExperiencesLoading(false);
        setEducationsLoading(false);
        setAdminLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <article className="block items-center justify-between mx-auto w-full max-w-[760px]">
      <figure className="max-w-full pb-[65px]">
        <div className="w-full  flex justify-center mb-4 md:mb-0">
          <img
            src="/image/IMG_9261.jpg"
            alt="avatar"
            className="shadow w-[180px] h-[180px] object-cover bg-white animate-morph-rounded"
          />
        </div>
      </figure>
      <div className="post-content-article text-[1.7rem]">
        {/* PHẦN HIỂN THỊ THÔNG TIN ADMIN*/}
        {admin ? (
          <AdminProfileCard
            admin={admin}
            setAdmin={setAdmin}
            loading={adminLoading}
          />
        ) : (
          <Spinner />
        )}
        {/* PHẦN HIỂN THỊ KINH NGHIỆM */}
        {experiencesLoading ? (
          <Spinner />
        ) : (
          <AdminExperienceList
            experiences={experiences}
            setExperiences={setExperiences}
          />
        )}

        {/* PHẦN KỸ NĂNG */}

        {skillsLoading ? (
          <Spinner />
        ) : (
          <AdminSkillsList skills={skills} setskill={setSkills} />
        )}
        {/* PHẦN HIỂN THỊ GIÁO DỤC */}
        {educationsLoading ? (
          <Spinner />
        ) : (
          <AdminEducationsList educations={educations} seteducation={setEducations} />
        )}
      </div>
    </article>
  );
}
