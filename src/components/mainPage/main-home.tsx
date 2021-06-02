import React from "react";
import { useAuth } from "../../hooks/use-auth";
import background from '../../img/background-mainhome.png'

export const MainHome = () => {
  const auth = useAuth();
  return (
    <>
      <div
        style={{
          padding: "200px 14px 200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1
          style={{
            margin: "calc(var(--vh, 1vh) * 10) 0 calc(var(--vh, 1vh) * 5)",
            fontSize: "28px",
            fontWeight: 500,
            lineHeight: "36px",
          }}
        >
          SHOP YOUR DESIGNER DRESSES
        </h1>
        <p
          style={{
            margin: "0 0 60px",
            color: "hsla(0, 0%, 0%, 0.7)",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
        >
          Ready to wear dresses tailored for you from online. Hurry up while
          stock lasts.
        </p>
        <div
          style={{
            padding: "18px",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "24px",
            color: "#05944F",
          }}
        >
          {auth.state.user ? "Welcome " + auth.state.user?.displayName : ""}
        </div>
      </div>
    </>
  );
};
