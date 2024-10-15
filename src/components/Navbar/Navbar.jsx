import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/SVG/Logo.svg"; // Adjusted import for Logo

const Navbar = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
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

  if (isLoading) {
    return null; // Don't render anything while loading
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          {/* Replacing the title with the Logo */}
          <img src={Logo} alt="TeamMessenger Logo" className={styles.logo} />
        </div>

        <div className={styles.navbarRight}>
          {isAuthenticated && user && (
            <div ref={dropdownRef} className="relative">
              {/* User's avatar */}
              <img
                src={user.picture}
                alt={user.name}
                className={styles.userAvatar}
                onClick={handleToggle}
              />
              {isOpen && (
                <div className={styles.dropdownMenu}>
                  <ul>
                    <li className={styles.dropdownItem}>Settings</li>
                    <li
                      className={styles.dropdownItem}
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
