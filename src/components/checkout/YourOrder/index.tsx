import React from "react";
import { YourOrderItem } from "./your-order";

export const YourOrder = () => {
  return (
    <div>
      <div style={{ marginTop: "-120px" }}></div>
      <div style={{ height: "120px" }}></div>
      <div
        style={{
          paddingTop: "20px",
          position: "sticky",
          top: 110,
          left: 0,
          background: "transparent",
          zIndex: 9,
        }}
      >
        <YourOrderItem />
      </div>
    </div>
  );
};
