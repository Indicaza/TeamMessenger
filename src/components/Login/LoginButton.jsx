import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Log In
    </button>
  );
};

export default LoginButton;
