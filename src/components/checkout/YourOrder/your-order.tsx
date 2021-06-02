import React, { useContext } from "react";
import { CartContext } from "../../../contexts/cart-context";

export const YourOrderItem = () => {
  const { cartItems, total, deliveryMethod } = useContext(CartContext);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ paddingLeft: "18px", fontSize: "18px" }}>Your Order</h1>
        <div
          style={{
            borderBottom: "2px solid rgb(155, 155, 155)",
            width: "100%",
          }}
        >
          {cartItems.map((el: any, idx: any) => {
            return (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 7fr 3fr",
                  gap: "8px",
                  padding: "8px",
                  marginTop: "12px",
                  borderBottom: "1px solid rgb(230, 230, 230)",
                }}
              >
                <span>{el.soluong}</span>
                <span>x</span>
                <span>{el.name}</span>
                <span style={{ textAlign: "right" }}>
                  {(
                    el.pricing *
                    el.soluong *
                    ((100 - el.saleOff || 0) / 100)
                  ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            padding: "8px",
            marginTop: "12px",
            width: "100%",
          }}
        >
          <span style={{ padding: "8px" }}>Sub Total</span>
          <span style={{ textAlign: "right", padding: "8px" }}>
            {total.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <span style={{ padding: "8px" }}>Delivery Fee</span>
          <span style={{ textAlign: "right", padding: "8px" }}>
            {deliveryMethod.fee.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <span style={{ padding: "8px" }}>Discount</span>
          <span style={{ textAlign: "right", padding: "8px" }}>
            {deliveryMethod.discount.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
