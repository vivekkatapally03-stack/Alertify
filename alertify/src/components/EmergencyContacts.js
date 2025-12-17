import React from "react";

function EmergencyContacts() {
  // Sample emergency contacts
  const contacts = [
    { name: "Police", number: "100" },
    { name: "Fire Brigade", number: "101" },
    { name: "Ambulance", number: "102" },
  ];

  // Simulate calling a number
  const handleCall = (number) => {
    alert(`📞 Calling ${number}... (simulated)`);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📱 Emergency Contacts</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {contacts.map((contact, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {contact.name} — {contact.number}
            </span>
            <button
              onClick={() => handleCall(contact.number)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Call
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyContacts;
