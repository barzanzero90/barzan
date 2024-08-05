import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { db, storage } from "../../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddProjectModal = ({ setShowAddProjectModal }) => {
  const [projectImage, setProjectImage] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const projectDescriptionmaxLength = 200;

  const handleUploadImage = async (image) => {
    try {
      const storageRef = ref(storage, `${image.name}`);
      await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(storageRef);
      return imageURL;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddProject = async () => {
    try {
      let projectImageURL = null;
      if (projectName.trim() != "" && projectDescription.trim() != "") {
        if (projectImage) {
          projectImageURL = await handleUploadImage(projectImage);
        }

        const projectsCollection = collection(db, "projects");
        await addDoc(projectsCollection, {
          project_image_url: projectImageURL,
          project_name: projectName,
          project_description: projectDescription,
          project_url: projectURL,
          created_at: new Date(),
        });

        setShowAddProjectModal(false);
        alert(`${projectName} project added successfully!`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddProjectModal(false)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50"
      style={{ zIndex: 999 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[325px] h-[375px] bg-black/90 rounded-md p-2 flex flex-col justify-start items-start gap-5"
      >
        <div className="flex justify-between items-center px-2 border-b border-b-[#666565] w-full p-1">
          <span></span>
          <strong>Add project</strong>
          <button
            onClick={() => setShowAddProjectModal(false)}
            className="transform transition-all ease-in-out duration-200 hover:text-[#969393]/80 active:text-[#969393]/60"
          >
            <CgClose size={23} />
          </button>
        </div>

        <div className="pt-3 flex flex-col justify-center items-center gap-3 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files[0])}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2"
          />

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2 bg-transparent"
          />

          <div className="relative">
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              maxLength={projectDescriptionmaxLength}
              className="border border-[#e4e4e5] rounded-md w-[250px] p-2 bg-transparent resize-none"
            />
            <p className="absolute bottom-2 right-3 text-gray-500">{projectDescription.length} / {projectDescriptionmaxLength}</p>
          </div>

          <input
            type="text"
            placeholder="Project URL"
            value={projectURL}
            onChange={(e) => setProjectURL(e.target.value)}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2 bg-transparent"
          />

          <button
            onClick={handleAddProject}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
