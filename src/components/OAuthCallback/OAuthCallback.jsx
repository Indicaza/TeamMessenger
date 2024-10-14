import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Exchange authorization code for tokens
      const exchangeCodeForToken = async () => {
        try {
          const response = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
              client_id: "<YOUR_CLIENT_ID>",
              client_secret: "<YOUR_CLIENT_SECRET>",
              code: code,
              grant_type: "authorization_code",
              redirect_uri: "http://localhost:3000/oauth2callback",
            }
          );

          // You get access_token and refresh_token here
          const { access_token, refresh_token } = response.data;
          console.log("Access Token:", access_token);
          console.log("Refresh Token:", refresh_token);

          // Store tokens (you can store them in localStorage or anywhere secure)
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
        } catch (error) {
          console.error("Error exchanging code for token", error);
        }
      };

      exchangeCodeForToken();
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Processing OAuth2 Callback...</h1>
    </div>
  );
};

export default OAuthCallback;
