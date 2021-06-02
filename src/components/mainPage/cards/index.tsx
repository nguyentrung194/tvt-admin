import React, { useState } from "react";
import { AddProduct } from "./addProduct";
import { List } from "./list";

export const ListProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div style={{ minHeight: "80vh", position: "relative" }}>
        {isOpen ? (
          <AddProduct />
        ) : (
          <button
            className="button-summit"
            style={{
              backgroundColor: "#0e3edb",
              width: "auto",
            }}
            onClick={() => setIsOpen(true)}
          >
            Thêm sản phẩm
          </button>
        )}
        <List />
      </div>
    </div>
  );
};
