import React from "react";
import { CgClose } from "react-icons/cg";

const ContactModal = ({ contact, setShowContactModal }) => {
  return (
    <div
      onClick={() => setShowContactModal(false)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50"
      style={{ zIndex: 999 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[180px] overflow-y-auto bg-black/90 rounded-md p-2 flex flex-col justify-start items-start gap-5"
      >
        <div className="flex justify-between items-center px-2 border-b border-b-[#666565] w-full p-1">
          <span></span>
          <strong>Contact</strong>
          <button
            onClick={() => setShowContactModal(false)}
            className="transform transition-all ease-in-out duration-200 hover:text-[#969393]/80 active:text-[#969393]/60"
          >
            <CgClose size={23} />
          </button>
        </div>

        <div className="pt-3 flex flex-col justify-start items-start gap-3 w-full">
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Message: {contact.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
