import React, { useState, useEffect } from "react";
import "./TrustedContacts.css";

function TrustedContacts({ onClose, viewOnly }) {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [number, setNumber] = useState("");

  // Load contacts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trustedContacts")) || [];
    setContacts(saved);
  }, []);

  const handleAddContact = () => {
    if (!name || !relation || !number) {
      return alert("Please fill all fields!");
    }

    const newContact = { name, relation, number };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem("trustedContacts", JSON.stringify(updatedContacts));

    alert(`✅ Contact ${name} added successfully!`);
    setName("");
    setRelation("");
    setNumber("");
    onClose();
  };

  const handleDelete = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    localStorage.setItem("trustedContacts", JSON.stringify(updated));
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!viewOnly ? (
          <>
            <h2>Add Trusted Contact</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="add-btn" onClick={handleAddContact}>
                Add Contact
              </button>
              <button className="close-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Saved Trusted Contacts</h2>
            {contacts.length === 0 ? (
              <p>No contacts saved.</p>
            ) : (
              <ul className="contact-list">
                {contacts.map((c, index) => (
                  <li key={index}>
                    <span>{c.name} ({c.relation}): {c.number}</span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TrustedContacts;
