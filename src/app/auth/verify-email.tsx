import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import useMedia from "../../hooks/use-media";

export const VerifyEmail = () => {
  const [refresh, setRefresh] = useState(false);
  const isWide = useMedia("(min-width: 480px)");
  const {
    state: { user },
    signout,
  }: any = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "80%",
        width: isWide ? "600px" : "100%",
        margin: "auto",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          textAlign: "center",
          padding: "18px",
        }}
      >
        <div
          style={{
            fontWeight: 400,
            fontSize: "26px",
            lineHeight: "20px",
          }}
        >
          Confirm Your Email
        </div>
        <p
          style={{
            marginBottom: "16px",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Please take a moment to verify your email address. We sent an email
          with a verification link to{" "}
          <span style={{ fontWeight: 500 }}>{user.email}</span>. If you didn’t
          receive the email, check your spam folder,{" "}
          <button
            style={{
              color: "#03713d",
              padding: "0",
              cursor: "pointer",
              background: "hsla(0, 0%, 0%, 0)",
              border: "none",
            }}
            onClick={async () => {
              try {
                await user.sendEmailVerification();
                console.log(
                  "You will receive an email with instructions about how to confirm your account in a few minutes."
                );
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            click here to resend it
          </button>
          .
        </p>
        <button
          disabled={refresh}
          onClick={() => {
            setRefresh(true);
            window.location.reload();
          }}
          style={{
            width: "100%",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
            borderBottomLeftRadius: "6px",
            marginTop: "12px",
            backgroundColor: "#05944F",
            boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
            padding: "8px 16px",
            margin: "6px 0",
          }}
        >
          I had verified email. Click to refresh.
        </button>
        <div>
          <div>
            <Link style={{ color: "#03713d", textDecoration: "none" }} to="/">
              Back to Home page
            </Link>
          </div>
          <div>
            <a
              onClick={signout}
              href="/"
              style={{ color: "#03713d", textDecoration: "none" }}
            >
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
