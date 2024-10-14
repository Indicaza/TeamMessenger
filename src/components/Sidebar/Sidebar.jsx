// src/components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      {!isOpen && (
        <div className={styles.sidebarToggle} onClick={toggleSidebar}>
          <span className={styles.arrow}>→</span>
          <span className={`${styles.tooltip} ${styles.tooltipOpen}`}>
            Open Sidebar
          </span>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarTitle}>
          <span>Messages</span>
          {/* Close button inside the sidebar */}
          <button onClick={toggleSidebar} className={styles.closeButton}>
            <span className={styles.arrow}>←</span>
            <span className={`${styles.tooltip} ${styles.tooltipClose}`}>
              Close Sidebar
            </span>
          </button>
        </div>
        <ul className={styles.messageList}>
          <li className={styles.messageItem}>Alice: Hey, how's it going?</li>
          <li className={styles.messageItem}>Bob: Can we meet tomorrow?</li>
          <li className={styles.messageItem}>
            Charlie: Don't forget to bring the documents.
          </li>
          <li className={styles.messageItem}>
            Alice: Did you see the latest update?
          </li>
          <li className={styles.messageItem}>
            Bob: Looking forward to your reply.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
