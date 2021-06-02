import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import { fbase } from "../../hooks/use-auth";
import useMedia from "../../hooks/use-media";
import { useToasts } from "react-toast-notifications";

export const ForgotPassword: React.FC<{}> = () => {
  const { addToast } = useToasts();
  const isWide = useMedia("(min-width: 480px)");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        await fbase.auth().sendPasswordResetEmail(values.email);
        addToast("We have sent you a link to reset your password", {
          appearance: "success",
          autoDismiss: true,
        });
      } catch (error) {
        addToast(error.message, { appearance: "error", autoDismiss: true });
      }
    },
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          height: "80%",
          width: isWide ? "450px" : "100%",
          margin: "auto",
          borderRadius: "6px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "hsla(0, 0%, 0%, 0.24)",
          boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.16)",
        }}
      >
        <div style={{ width: "90%" }}>
          <div
            style={{
              width: "100%",
              fontSize: "26px",
              fontWeight: "normal",
              lineHeight: "20px",
            }}
          >
            Forgot Password
          </div>
          <p
            style={{
              width: "100%",
              fontSize: "16px",
              lineHeight: "24px",
              paddingBottom: "14px",
              color: "gray",
            }}
          >
            Enter your email address below, and we'll send you a link to reset
            your password.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "100%", textAlign: "left" }}
          >
            <input
              style={{ width: "91%", padding: "8px 16px", margin: "6px 0" }}
              required
              name="email"
              type="email"
              placeholder="Enter your email address..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
                borderBottomLeftRadius: "6px",
                marginTop: "12px",
                backgroundColor: "#05944F",
                boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
                padding: "8px 16px",
                margin: "6px 0",
              }}
            >
              Send reset link
            </button>
          </form>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              lineHeight: "24px",
              color: "#757575",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Did you just remember your password? Go{" "}
            <Link to="/auth/sign-in">Sign in</Link>
          </p>
        </div>
      </div>

      <div>
        <div>Mail,</div>
        <div>Check your inbox</div>
      </div>
    </>
  );
};
