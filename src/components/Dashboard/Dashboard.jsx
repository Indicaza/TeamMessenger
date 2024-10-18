// src/components/Dashboard/Dashboard.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user } = useAuth0();

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <img
        src={user.picture}
        alt="User Profile"
        className="mx-auto rounded-full w-32 h-32 mt-4"
      />
      <p className="mt-4">You are logged in successfully!</p>
    </div>
  );
};

export default Dashboard;
