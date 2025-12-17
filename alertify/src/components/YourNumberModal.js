// src/components/YourNumberModal.js
import React, { useState } from "react";
import "./YourNumberModal.css";

function YourNumberModal({ onClose }) {
  const [userNumber, setUserNumber] = useState(
    localStorage.getItem("userNumber") || ""
  );

  const handleSave = () => {
    if (!userNumber) {
      alert("Please enter your WhatsApp number!");
      return;
    }
    localStorage.setItem("userNumber", userNumber);
    alert("✅ Your number has been saved successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Your WhatsApp Number</h2>
        <input
          type="text"
          placeholder="Enter your WhatsApp number (with country code)"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="add-btn" onClick={handleSave}>
            Save
          </button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default YourNumberModal;
