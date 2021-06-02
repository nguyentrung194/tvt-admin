import React from "react";

export const ProductLoading = ({ product }: any) => {
  return (
    <div
      key={product.key}
      style={{
        border: "2px solid #e7e7e7",
        borderRadius: "4px",
        padding: "6px",
        margin: "6px",
        textAlign: "center",
        position: "relative",
        maxWidth: "150px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          right: "3px",
          backgroundColor: "rgb(255, 173, 94)",
          padding: product.saleOff ? "6px" : "",
          color: "rgb(255, 255, 255)",
          zIndex: 2,
          borderRadius: "30px",
          fontSize: "14px",
        }}
      >
        <p
          style={{
            background: "rgb(202, 202, 202)",
            width: "100%",
            height: "100%",
          }}
        ></p>
      </div>
      <div
        style={{
          background: "rgb(202, 202, 202)",
          width: "100%",
          height: "60%",
          padding: "3px",
        }}
      ></div>

      <div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "20px",
            textAlign: "start",
            background: "rgb(202, 202, 202)",
            width: "50%",
            marginTop: "30px",
          }}
        ></div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            lineHeight: "24px",
            textDecoration: "line-through",
            textAlign: "start",
            height: "24px",
            background: "rgb(202, 202, 202)",
            width: "100%",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              lineHeight: "24px",
              background: "rgb(202, 202, 202)",
              width: "100%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
