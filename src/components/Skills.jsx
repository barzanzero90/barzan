import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export default function Skills() {
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

  return (
    <div
      id="skills"
      className="lg:p-14 p-2 flex flex-col justify-start items-start gap-3 py-2"
    >
      <h1 className="text-4xl">Skills</h1>

      <div className="flex flex-wrap justify-center items-center gap-3 m-auto">
        {skills.map((skill) => (
          <div key={skill.id} className="w-[150px] border border-[#31236F] rounded-lg p-2 flex justify-center items-center">
            <img
              src={skill.skillImage}
              alt=""
              className="h-[80px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
