import React, { useEffect, useState } from "react";
import AddSkillModal from "./modals/AddSkillModal";
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

const Skills = () => {
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    try {
      const skillsCollection = collection(db, "skills");
      onSnapshot(
        query(skillsCollection, orderBy("created_at", "desc")),
        (snapshot) => {
          const skills = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSkills(skills);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleDeleteSkill = async (skillId) => {
    try {
      const skillDoc = doc(db, "skills", skillId);
      await deleteDoc(skillDoc, skillId);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      id="skills"
      className="flex flex-col gap-4 w-full border-b border-b-[#3e2c8d] pb-3"
    >
      <div className="flex justify-between items-center w-full px-3">
        <h2 className="text-xl font-semibold">Skills ({skills.length})</h2>

        <button
          onClick={() => setShowAddSkillModal(!showAddSkillModal)}
          className="transform transition-all ease-in-out duration-200 hover:text-[#e4e4e5]/80 active:text-[#e4e4e5]/60"
        >
          Add skill
        </button>

        {showAddSkillModal && (
          <AddSkillModal setShowAddSkillModal={setShowAddSkillModal} />
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="relative w-[150px] border border-[#3e2c8d] p-2 rounded-md flex justify-center items-center"
          >
            <img src={skill.skillImage} className="h-[60px]" alt="" />

            <button
              onClick={() => handleDeleteSkill(skill.id)}
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

export default Skills;
