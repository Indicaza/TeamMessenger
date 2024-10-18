// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/SVG/Logo.svg"; // Adjusted import for Logo

const Navbar = ({ onLogout, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside of it
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
    userProfile = { name: "Test User", picture: "/path/to/default-avatar.png" }; // Mock user profile
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          {/* Replacing the title with the Logo */}
          <img src={Logo} alt="TeamMessenger Logo" className={styles.logo} />
        </div>

        <div className={styles.navbarRight}>
          <div ref={dropdownRef} className={styles.userMenu}>
            {/* User's avatar */}
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
