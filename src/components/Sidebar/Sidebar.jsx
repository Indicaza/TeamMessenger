// src/components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import ChatList from "./ChatList";

const Sidebar = ({ onSelectChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarTitle}>
          <span>Messages</span>
          <button onClick={toggleSidebar} className={styles.closeButton}>
            <span className={styles.arrow}>←</span>
            <span className={`${styles.tooltip} ${styles.tooltipClose}`}>
              Close Sidebar
            </span>
          </button>
        </div>
        <ChatList onSelectChat={onSelectChat} />
      </div>
    </>
  );
};

export default Sidebar;
