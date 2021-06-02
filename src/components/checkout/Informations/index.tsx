import React from "react";
import { ContactNumber } from "./contact-number";
import { DeliveryAddress } from "./delivery-address";
import { DeliveryMethod } from "./delivery-method";
import { PaymentOption } from "./payment-option";

export const Informations = () => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        margin: "8px",
        maxWidth: "723px",
      }}
    >
      <DeliveryAddress />
      <DeliveryMethod />
      <ContactNumber />
      <PaymentOption />
    </div>
  );
};
