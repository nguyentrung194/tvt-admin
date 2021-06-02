import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const AuthLayout = () => {
  const { state }: any = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      state.customClaims &&
      state.customClaims.claims.hasOwnProperty("https://hasura.io/jwt/claims")
    ) {
      const role =
        state.customClaims.claims["https://hasura.io/jwt/claims"][
          "x-hasura-default-role"
        ];
      if (state.user.emailVerified && role === "user") {
        navigate("/");
      }
    }
  }, [state, navigate]);
  return (
    <>
      <div
        style={{
          display: "grid",
          width: "100%",
          height: `calc(var(--vh, 1vh) * 90)`,
          gridTemplateColumns: "auto",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          style={{
            display: "grid",
            placeItems: "center",
            padding: "16px",
          }}
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
};
