import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/SVG/Logo.svg";
import { clearStorage } from "../../storageHelper.js";

const Navbar = ({ onLogout, userProfile, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClearStorage = () => {
    clearStorage()
      .then(() => {
        alert("Local storage cleared!");
        onReset(); // Trigger the reset in ChatList
      })
      .catch((error) => {
        console.error("Error clearing local storage:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!userProfile) {
    userProfile = { name: "Test User", picture: "/path/to/default-avatar.png" };
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <img src={Logo} alt="TeamMessenger Logo" className={styles.logo} />
        </div>

        <div className={styles.navbarRight}>
          <div ref={dropdownRef} className={styles.userMenu}>
            <img
              src={userProfile.picture}
              alt={userProfile.name}
              className={styles.userAvatar}
              onClick={handleToggle}
            />
            {isOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  <li className={styles.dropdownItem}>Settings</li>
                  <li
                    className={styles.dropdownItem}
                    onClick={handleClearStorage}
                  >
                    Clear Storage
                  </li>
                  <li className={styles.dropdownItem} onClick={onLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
