import React, { useState, useEffect, forwardRef } from "react";
import { Trash2 } from "lucide-react";
import "./TrustedContacts.css";

const ViewContacts = forwardRef(({ onClose }, ref) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
    setContacts(savedContacts);
  }, []);

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    localStorage.setItem("trustedContacts", JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={ref}>
        <h2>Saved Trusted Contacts</h2>

        {contacts.length > 0 ? (
          <ul style={{ textAlign: "left", padding: "0 10px", width: "100%" }}>
            {contacts.map((contact, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  color: "#00ffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.08)",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div>
                  <strong>Name:</strong> {contact.name}
                </div>
                <div>
                  <strong>Number:</strong> {contact.number}
                </div>
                <div>
                  <strong>Relation:</strong> {contact.relation}
                </div>
                <Trash2
                  size={20}
                  color="red"
                  style={{ cursor: "pointer", alignSelf: "flex-end" }}
                  onClick={() => handleDelete(index)}
                  title="Delete contact"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#ccc" }}>No contacts saved yet.</p>
        )}
        <div className="modal-buttons">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

export default ViewContacts;
