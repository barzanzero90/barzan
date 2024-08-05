import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { db, storage } from "../../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddSkillModal = ({ setShowAddSkillModal }) => {
  const [skillImage, setSkillImage] = useState(null);

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

  const handleAddSKill = async () => {
    try {
      let skillImageURL = null;

      if (skillImage) {
        skillImageURL = await handleUploadImage(skillImage);

        const skillsCollection = collection(db, "skills");
        await addDoc(skillsCollection, {
          skillImage: skillImageURL,
          created_at: new Date(),
        });

        setShowAddSkillModal(false);
        alert("Skill added successfully!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddSkillModal(false)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50"
      style={{ zIndex: 999 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[180px] bg-black/90 rounded-md p-2 flex flex-col justify-start items-start gap-5"
      >
        <div className="flex justify-between items-center px-2 border-b border-b-[#666565] w-full p-1">
          <span></span>
          <strong>Add skill</strong>
          <button
            onClick={() => setShowAddSkillModal(false)}
            className="transform transition-all ease-in-out duration-200 hover:text-[#969393]/80 active:text-[#969393]/60"
          >
            <CgClose size={23} />
          </button>
        </div>

        <div className="pt-3 flex flex-col justify-center items-center gap-3 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSkillImage(e.target.files[0])}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2"
          />

          <button
            onClick={handleAddSKill}
            className="border border-[#e4e4e5] rounded-md w-[250px] p-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
