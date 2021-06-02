import React from "react";
import { motion } from "framer-motion";

import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export const HeaderLayout = () => {
  return (
    <>
      <div
        style={
          {
            //   display: "grid",
            //   width: "100%",
            //   height: `calc(var(--vh, 1vh) * 90)`,
            //   gridTemplateColumns: "auto",
            //   justifyContent: "center",
            //   backgroundColor: "white",
          }
        }
      >
        <Header />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          style={
            {
              // display: "grid",
              // placeItems: "center",
              // padding: "16px",
            }
          }
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
};
