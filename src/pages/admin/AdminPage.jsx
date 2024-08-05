import React from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/admin/Header";
import Skills from "../../components/admin/Skills";
import Projects from "../../components/admin/Projects";
import Contacts from "../../components/admin/Contacts";

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <Header />
          <Skills />
          <Projects />
          <Contacts />
        </div>
      ) : (
        <>404</>
      )}
    </>
  );
};

export default AdminPage;
