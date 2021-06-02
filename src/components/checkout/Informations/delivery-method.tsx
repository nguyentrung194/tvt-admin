import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/cart-context";
import useMedia from "../../../hooks/use-media";

export const DeliveryMethod = () => {
  const isWide = useMedia("(min-width: 480px)");
  const [opt, setOpt] = useState(
    localStorage.getItem("DeliveryMethodInf") || ""
  );
  const { addDeliveryMethod } = useContext(CartContext);

  return (
    <div>
      <div
        style={{
          padding: "30px",
          boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.16)",
          backgroundColor: "rgb(255, 255, 255)",
          margin: "10px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            paddingBottom: "26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>
            <span
              style={{
                background: "rgb(5, 148, 79)",
                borderRadius: "30px",
                fontSize: "18px",
                color: "rgb(255, 255, 255)",
                padding: "6px 12px",
              }}
            >
              2
            </span>
            <strong style={{ paddingLeft: "18px", fontSize: "18px" }}>
              Delivery Method
            </strong>
          </h1>
        </div>
        <div
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollBehavior: "smooth",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))",
            gridGap: isWide ? "6px" : "3px",
            maxHeight: "260px",
          }}
        >
          <div
            onClick={() => {
              localStorage.setItem(
                "DeliveryMethod",
                "{fee: 31000, discount: 13000}"
              );
              addDeliveryMethod({ fee: 31000, discount: 13000 });
              localStorage.setItem("DeliveryMethodInf", "0");
              setOpt("0");
            }}
            style={{
              height: "64px",
              maxWidth: "200px",
              padding: "20px",
              backgroundColor:
                opt === "0" ? "rgb(255, 255, 255)" : "rgb(246, 246, 246)",
              marginRight: "15px",
              marginBottom: "15px",
              border: `1px solid ${
                opt === "0" ? "rgb(5, 148, 79)" : "transparent"
              }`,
              borderRadius: "5px",
              transition: "all 0.25s ease 0s",
              cursor: "pointer",
            }}
          >
            <h1
              style={{
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              J&R Express
            </h1>
            <p>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  lineHeight: "24px",
                  textDecoration: "line-through",
                  textAlign: "start",
                  height: "24px",
                }}
              >
                {(31000).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              {(18000).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>Vận chuyển trong: 4 ngày</p>
          </div>
          <div
            onClick={() => {
              localStorage.setItem(
                "DeliveryMethod",
                "{fee: 12000, discount: 0}"
              );
              addDeliveryMethod({ fee: 12000, discount: 0 });
              setOpt("1");
            }}
            style={{
              height: "64px",
              maxWidth: "200px",
              padding: "20px",
              backgroundColor:
                opt === "1" ? "rgb(255, 255, 255)" : "rgb(246, 246, 246)",
              marginRight: "15px",
              marginBottom: "15px",
              border: `1px solid ${
                opt === "1" ? "rgb(5, 148, 79)" : "transparent"
              }`,
              borderRadius: "5px",
              transition: "all 0.25s ease 0s",
              cursor: "pointer",
            }}
          >
            <h1
              style={{
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Giao hàng tiết kiếm
            </h1>
            <p>
              {(12000).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>Vận chuyển trong 7 ngày</p>
          </div>
        </div>
      </div>
    </div>
  );
};
