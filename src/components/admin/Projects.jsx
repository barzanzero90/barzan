import React, { useEffect, useState } from "react";
import AddProjectModal from "./modals/AddProjectModal";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { BiTrash } from "react-icons/bi";

const Projects = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
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

  const handleDeleteProject = async (projectId) => {
    try {
      const projectDoc = doc(db, "projects", projectId);
      await deleteDoc(projectDoc, projectId);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      id="projects"
      className="flex flex-col gap-4 w-full border-b border-b-[#3e2c8d] pb-3"
    >
      <div className="flex justify-between items-center w-full px-3">
        <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>

        <button
          onClick={() => setShowAddProjectModal(true)}
          className="transform transition-all ease-in-out duration-200 hover:text-[#e4e4e5]/80 active:text-[#e4e4e5]/60"
        >
          Add project
        </button>

        {showAddProjectModal && (
          <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} />
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative max-w-[350px] border border-[#31236F] rounded-lg flex justify-center items-center gap-3 p-2"
          >
            <img
              src={project.project_image_url}
              alt=""
              className="w-[100px] h-[100px] object-contain"
            />

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

            <button
              onClick={() => handleDeleteProject(project.id)}
              className="absolute top-1.5 left-2 p-1 rounded-full bg-red-500 text-white transform transition-all ease-in-out duration-300 hover:bg-red-600 active:bg-red-700"
            >
              <BiTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
