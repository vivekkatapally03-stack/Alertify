import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function HelpButton() {
  const [location, setLocation] = useState(null);

  const handleHelpClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(coords);

          const userNumber = localStorage.getItem("userNumber");
          const contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];

          if (!userNumber) {
            alert("Please add your WhatsApp number first in 'Your Number'!");
            return;
          }
          if (contacts.length === 0) {
            alert("No trusted contacts found!");
            return;
          }

          contacts.forEach((contact) => {
          const cleanedNumber = contact.number.replace(/\D/g, "");

          const message = `🚨 Emergency Alert!\nI am in trouble.\nReach me by this location.\nLocation: https://www.google.com/maps?q=${coords.lat},${coords.lon}`;
          const encodedMessage = encodeURIComponent(message);

          window.open(
            `https://wa.me/${cleanedNumber}?text=${encodedMessage}`,
            "_blank"
          );
        });


          alert("Emergency messages opened in WhatsApp for all saved contacts!");
        },
        () => {
          alert("Unable to get location. Please enable location access!");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <button
        onClick={handleHelpClick}
        style={{
          padding: "20px 40px",
          fontSize: "20px",
          backgroundColor: "#d32f2f",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        HELP ME 🚨
      </button>

      {location && (
        <div style={{ marginTop: "20px" }}>
          <p>📍 Latitude: {location.lat}</p>
          <p>📍 Longitude: {location.lon}</p>

          <MapContainer
            center={[location.lat, location.lon]}
            zoom={15}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lon]}>
              <Popup>Your current location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default HelpButton;
