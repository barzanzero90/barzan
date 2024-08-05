import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import ContactModal from "./modals/ContactModal";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const getContacts = async () => {
    try {
      const contactsCollection = collection(db, "contacts");
      onSnapshot(
        query(contactsCollection, orderBy("created_at", "desc")),
        (snapshot) => {
          const contacts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contacts);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const truncateMessage = (message, number) => {
    return message.length > number
      ? message.substring(0, number) + "..."
      : message;
  };

  const handleSelectedContact = (selectedContact) => {
    setSelectedContact(selectedContact);
    setShowContactModal(true);
  };

  return (
    <div id="contacts" className="flex flex-col gap-4 w-full pb-3">
      <h2 className="text-xl font-semibold px-3">
        Contacts ({contacts.length})
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => handleSelectedContact(contact)}
            className="max-w-[300px] p-2 border border-[#3e2c8d] rounded-md cursor-pointer"
          >
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {truncateMessage(contact.message, 20)}</p>

            {showContactModal && (
              <ContactModal
                contact={selectedContact}
                setShowContactModal={setShowContactModal}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
