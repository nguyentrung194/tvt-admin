import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { fana, fbase } from "../../hooks/use-auth";
import useMedia from "../../hooks/use-media";

export const Signup = () => {
  const isWide = useMedia("(min-width: 480px)");
  const { addToast } = useToasts();
  const handelSignInWithGoogle = async () => {
    const provider = new fbase.auth.GoogleAuthProvider();
    return await fbase.auth().signInWithPopup(provider);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userRes = await fbase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        if (userRes) {
          await userRes.user?.sendEmailVerification();
          fana.setUserId(userRes.user?.uid as string);
        }
        addToast("Login successfull!", {
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
              marginBottom: "10px",
              fontSize: "21px",
              fontWeight: 600,
              color: "rgb(0, 158, 127)",
            }}
          >
            Create account
          </div>
          <div style={{ width: "100%" }}>
            <form
              style={{ width: "100%", textAlign: "left" }}
              onSubmit={formik.handleSubmit}
            >
              <input
                name="email"
                type="email"
                style={{ width: "91%", padding: "8px 16px", margin: "6px 0" }}
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <input
                name="password"
                type="password"
                style={{ width: "91%", padding: "8px 16px", margin: "6px 0" }}
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                style={{
                  // width: "100%",
                  // borderTopLeftRadius: "6px",
                  // borderTopRightRadius: "6px",
                  // borderBottomRightRadius: "6px",
                  // borderBottomLeftRadius: "6px",
                  // marginTop: "12px",
                  // backgroundColor: "#05944F",
                  // boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
                  // padding: "8px 16px",
                  // margin: "6px 0",
                  padding: "0px 30px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease 0s",
                  borderRadius: "6px",
                  appearance: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  textAlign: "center",
                  textDecoration: "none",
                  fontFamily: "inherit",
                  border: "0px",
                  color: "rgb(255, 255, 255)",
                  backgroundColor: "rgb(0, 158, 127)",
                  height: "48px",
                  width: "100%",
                }}
                disabled={formik.isSubmitting}
                type="submit"
              >
                Continue
              </button>
            </form>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            >
              <hr
                style={{
                  margin: 0,
                  border: "none",
                  flex: "1 1 0%",
                  borderTop: `1px solid #E2E2E2`,
                }}
              />
              <span
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "normal",
                  lineHeight: "24px",
                  color: "#757575",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                or
              </span>
              <hr
                style={{
                  margin: 0,
                  border: "none",
                  flex: "1 1 0%",
                  borderTop: `1px solid #E2E2E2`,
                }}
              />
            </div>
            <div>
              <button
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  outline: "none",
                  backgroundColor: "white",
                  height: "auto",
                  lineHeight: "normal",
                  minHeight: "40px",
                  padding: "8px 16px",
                  width: "100%",
                  boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
                  borderRadius: "6px",
                  border: "none",
                }}
                onClick={handelSignInWithGoogle}
                type="button"
              >
                <span
                  style={{
                    color: `#151515`,
                    fontSize: "14px",
                    lineHeight: "16px",
                    paddingLeft: "16px",
                    textTransform: "none",
                    verticalAlign: "middle",
                  }}
                >
                  Continue with Google
                </span>
              </button>
            </div>
            <p
              style={{
                width: "100%",
                fontSize: "16px",
                lineHeight: "24px",
                paddingBottom: "14px",
                color: "gray",
                marginTop: "6px",
              }}
            >
              Already have an account?{" "}
              <Link
                style={{
                  fontWeight: 500,
                  color: "#03713d",
                  textDecoration: "none",
                }}
                to="/auth/sign-in"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
