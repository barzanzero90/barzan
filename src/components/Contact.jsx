import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebaseConfig";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAddContact = async () => {
    try {
      if (name.trim() != "" && email.trim() != "" && message.trim() != "") {
        setLoading(true);

        const contactsCollection = collection(db, "contacts");
        await addDoc(contactsCollection, {
          name,
          email,
          message,
          created_at: new Date(),
        });

        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      id="contact"
      className="px-14 flex flex-col justify-start items-start gap-3 py-2"
    >
      <h1 className="text-4xl">Contact</h1>

      <div className="flex flex-col justify-center items-center gap-3 mx-auto w-[95%]">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[250px] bg-transparent border border-[#5E43D5] rounded-md p-2"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[250px] bg-transparent border border-[#5E43D5] rounded-md p-2"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[250px] bg-transparent border border-[#5E43D5] rounded-md p-2 resize-none"
        />

        <button
          onClick={handleAddContact}
          disabled={loading}
          className="w-[250px] rounded-md p-2 bg-[#5E43D5] transform transition-all easy-in-out duration-200 hover:opacity-85"
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}
