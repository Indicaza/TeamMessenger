import React, { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import ChatList from "./ChatList";

const Sidebar = ({ onSelectChat, resetTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <div className={styles.sidebarToggle} onClick={toggleSidebar}>
          <span className={styles.arrow}>→</span>
          <span className={`${styles.tooltip} ${styles.tooltipOpen}`}>
            Open Sidebar
          </span>
        </div>
      )}

      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.sidebarTitle}>
          <span>Messages</span>
          <button onClick={toggleSidebar} className={styles.closeButton}>
            <span className={styles.arrow}>←</span>
            <span className={`${styles.tooltip} ${styles.tooltipClose}`}>
              Close Sidebar
            </span>
          </button>
        </div>
        <ChatList onSelectChat={onSelectChat} resetTrigger={resetTrigger} />
      </div>
    </>
  );
};

export default Sidebar;
