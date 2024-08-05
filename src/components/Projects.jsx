import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const projectsCollection = collection(db, "projects");
      onSnapshot(
        query(projectsCollection, orderBy("created_at", "desc")),
        (snapshot) => {
          const projects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projects);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div
      id="projects"
      className="sm:p-14 p-2 flex flex-col justify-start items-start gap-3 py-2"
    >
      <h1 className="text-4xl">Projects</h1>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="max-w-[350px] border border-[#31236F] rounded-lg flex justify-center items-center gap-3 p-2"
          >
            <img src={project.project_image_url} alt="" className="h-[50px]" />

            <div className="flex flex-col justify-start items-start gap-1.5">
              <h3 className="text-xl font-semibold">{project.project_name}</h3>
              <p className="w-full">{project.project_description}</p>
              <a
                href={project.project_url}
                target="_blank"
                className="py-1 px-3 border border-[#5E43D5] rounded-lg text-[#5E43D5] transform transition-all easy-in-out duration-300 hover:bg-[#5E43D5] hover:text-white"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
