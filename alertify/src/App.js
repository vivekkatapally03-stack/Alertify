import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import HelpButton from "./components/HelpButton";
import EmergencyContacts from "./components/EmergencyContacts";
import TrustedContacts from "./components/TrustedContacts";
import ViewContacts from "./components/ViewContacts";
import YourNumberModal from "./components/YourNumberModal";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showTrustedContacts, setShowTrustedContacts] = useState(false);
  const [viewContactsOpen, setViewContactsOpen] = useState(false);
  const [showYourNumber, setShowYourNumber] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const dropdownRef = useRef(null);
  const trustedRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("loggedInUser", "true");
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setShowSignUp(false);
    alert("Account created successfully! Please log in.");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowSignUp(false);
  };

  const toggleHomeDropdown = () => {
    setHomeOpen(!homeOpen);
    setAboutOpen(false);
    setContactOpen(false);
  };

  const toggleAboutDropdown = () => {
    setAboutOpen(!aboutOpen);
    setHomeOpen(false);
    setContactOpen(false);
  };

  const toggleContactDropdown = () => {
    setContactOpen(!contactOpen);
    setHomeOpen(false);
    setAboutOpen(false);
  };

  const handleShowTrustedContacts = () => {
    setShowTrustedContacts(true);
    setHomeOpen(false);
  };

  const handleViewContacts = () => {
    setViewContactsOpen(true);
    setHomeOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!trustedRef.current || !trustedRef.current.contains(event.target)) &&
        (!viewRef.current || !viewRef.current.contains(event.target))
      ) {
        setHomeOpen(false);
        setAboutOpen(false);
        setContactOpen(false);
        setShowTrustedContacts(false);
        setViewContactsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    if (showSignUp) {
      return (
        <SignUp
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setShowSignUp(false)}
        />
      );
    } else {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignUp={() => setShowSignUp(true)}
        />
      );
    }
  }

  return (
    <div>
      <header>
        <h2>Alertify 🚨</h2>
        <nav className="nav-links">
          {/* HOME Dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropbtn" onClick={toggleHomeDropdown}>
              Home
            </button>
            <div className={`dropdown-content ${homeOpen ? "show" : ""}`}>
              <a href="#add-contact" onClick={handleShowTrustedContacts}>
                Add Trusted Contacts
              </a>
              <a href="#view-contacts" onClick={handleViewContacts}>
                View Saved Contacts
              </a>
              <a href="#your-number" onClick={() => setShowYourNumber(true)}>
                Your Number
              </a>
              <a href="#logout" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>

          {/* ABOUT Dropdown */}
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleAboutDropdown}>
              About
            </button>
            <div className={`dropdown-content ${aboutOpen ? "show" : ""}`}>
              <p style={{ margin: "10px", color: "#00ffff", lineHeight: "1.4" }}>
                Alertify is a smart safety web app specially designed for women.
                It helps users stay safe by instantly sharing their live
                location with trusted contacts via WhatsApp.
              </p>
            </div>
          </div>

          {/* CONTACT Dropdown */}
<div className="dropdown">
  <button className="dropbtn" onClick={toggleContactDropdown}>
    Contact
  </button>
  <div
    className={`dropdown-content ${contactOpen ? "show" : ""}`}
    style={{
      left: "auto",
      right: "10px", // ✅ move slightly left so it stays visible
      minWidth: "220px", // ✅ ensure enough width
      textAlign: "left",
    }}
  >
    <p style={{ margin: "10px", color: "#00ffff", lineHeight: "1.6" }}>
      📧{" "}
      <a
        href="mailto:vivekkatapally03@gmail.com"
        style={{
          color: "#00ffff",
          textDecoration: "underline",
        }}
      >
        vivekkatapally03@gmail.com
      </a>
      {/* <br /> */}
      📞{" "}
      <a
        href="tel:+916304209640"
        style={{
          color: "#00ffff",
          textDecoration: "underline",
        }}
      >
        +91 6304209640
      </a>
    </p>
  </div>
</div>

        </nav>
      </header>

      <div className="App">
        <h1 className="typewriter">Welcome to Alertify</h1>
        <p>Smart Safety Web App</p>
        <HelpButton />
        <EmergencyContacts />

        {showTrustedContacts && (
          <div ref={trustedRef}>
            <TrustedContacts onClose={() => setShowTrustedContacts(false)} />
          </div>
        )}
        {viewContactsOpen && (
          <div ref={viewRef}>
            <ViewContacts onClose={() => setViewContactsOpen(false)} />
          </div>
        )}
        {showYourNumber && (
          <YourNumberModal onClose={() => setShowYourNumber(false)} />
        )}

        {/* Privacy Policy Modal */}
        {showPrivacyPolicy && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Privacy Policy</h2>
              <p>
                We respect your privacy. Alertify only stores your contact
                details locally in your browser and never shares data with
                others.
              </p>
              <button
                className="close-btn"
                onClick={() => setShowPrivacyPolicy(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer
          style={{
            marginTop: "40px",
            padding: "15px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            color: "#555",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: 0 }}>
            © 2025 Alertify. All rights reserved. | Developed by Vivek Katapally.{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPrivacyPolicy(true);
              }}
              style={{
                color: "#555",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
