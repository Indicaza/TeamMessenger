// src/components/Login/UserProfile.jsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User Info:", user);
    }
  }, [isAuthenticated, user]);

  return null; // We are only logging, not rendering anything here.
};

export default Profile;
