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
    // cleans the number
    const cleanedNumber = userNumber.replace(/\D/g, "");

    if (cleanedNumber.length < 10) {
      alert("Please enter a valid WhatsApp number with country code!");
      return;
    }

    localStorage.setItem("userNumber", cleanedNumber);
    alert("✅ Your number has been saved successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Your WhatsApp Number</h2>
        <input
          type="text"
          placeholder="Enter number e.g. 91xxxxxxxxxx"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        />
        <p style={{ fontSize: "12px", color: "#00ffff", marginTop: "-10px" }}>
          ⚠️ Include your country code, no +, spaces, or dashes.
        </p>
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
