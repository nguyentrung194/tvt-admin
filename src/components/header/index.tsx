import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import useMedia from "../../hooks/use-media";
import { FilterProduct } from "./fillter";
import logo64 from '../../img/logo64.png'

export const Header = (props: any) => {
  const isWide = useMedia("(min-width: 480px)");
  const auth = useAuth();

  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 9998,
          transition: "top 0.3s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(252, 252, 252)",
            padding: "0 5px",
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.1)",
            zIndex: 9998,
            boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.16)",
          }}
        >
          <div
            style={{
              padding: "6px 6px",
              display: isWide ? "flex" : "none",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link style={{ outline: "none" }} to="/">
              <img
                style={{ width: "36px" }}
                src={logo64}
                alt="Logo"
              />
            </Link>
            <span>IRONMAN</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // padding: "16px 12px",
            }}
          >
            <FilterProduct />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {auth.state.user ? (
                <button
                  onClick={auth.signout}
                  style={{
                    padding: "0 12px",
                    color: "#03713d",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  <div style={{ paddingRight: "6px" }}>
                    {isWide ? "Logout" : ""}
                  </div>
                  {/* <img
                    src="https://firebasestorage.googleapis.com/v0/b/store-of-king.appspot.com/o/asset%2Flogout-24.png?alt=media&token=95aa0afe-73f9-41df-b6f8-9384cac6f467"
                    alt="Logout"
                  /> */}
                </button>
              ) : (
                <Link
                  style={{
                    padding: "0 12px",
                    color: "#03713d",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  to="/auth/sign-in"
                >
                  <div style={{ paddingRight: "6px" }}>
                    {isWide ? "Login" : ""}
                  </div>
                  {/* <img
                    src="https://firebasestorage.googleapis.com/v0/b/store-of-king.appspot.com/o/asset%2Flogin-24.png?alt=media&token=9ef01eab-9547-4317-8217-61e56e380fdb"
                    alt="Login"
                  /> */}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
