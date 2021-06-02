import { useFormik } from "formik";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  GetContactDocument,
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
} from "../../../graphql/autogenerate/hooks";
import { useAuth } from "../../../hooks/use-auth";
import useMedia from "../../../hooks/use-media";

export const ContactNumber = () => {
  const isWide = useMedia("(min-width: 480px)");
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToasts();
  const [addContact] = useAddContactMutation();
  const {
    state: { user },
  } = useAuth();

  const formik: any = useFormik({
    initialValues: {
      local: "",
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        {
          /* {local, phone} */
        }

        const dataRes = await addContact({
          variables: {
            email: user?.email || "",
            phones: {
              local: values.local,
              phone: values.phone,
            },
          },
          refetchQueries: [
            {
              query: GetContactDocument,
              variables: { email: user?.email || "" },
            },
          ],
          awaitRefetchQueries: true,
        });
        formik.setSubmitting(false);
        addToast("Add successfull!", {
          appearance: "info",
          autoDismiss: true,
        });
        setIsOpen(false);
        formik.handleReset();
      } catch (error) {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      }
    },
  });

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
              3
            </span>
            <strong style={{ paddingLeft: "18px", fontSize: "18px" }}>
              Contact Number
            </strong>
          </h1>

          <button
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontWeight: 700,
              color: "rgb(0, 158, 127)",
              lineHeight: "24px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            + Add Contact
          </button>
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
          <Phones />
        </div>
        <div
          style={{
            padding: "20px",
            width: "50%",
            backgroundColor: "rgb(255, 255, 255)",
            marginRight: "15px",
            marginBottom: "15px",
            border: "1px solid rgb(5, 148, 79)",
            borderRadius: "5px",
            transition: "all 0.25s ease 0s",
            textAlign: "center",
            display: isOpen ? "" : "none",
            position: "relative",
          }}
        >
          <button
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontWeight: 700,
              color: "rgb(0, 158, 127)",
              lineHeight: "24px",
              cursor: "pointer",
              position: "absolute",
              top: "6px",
              right: "6px",
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            x
          </button>
          <h1
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            Add new contact
          </h1>
          <form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
            onSubmit={formik.handleSubmit}
          >
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="local"
              placeholder="Label"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("local", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.local}
            />
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="phone"
              placeholder="Your number contact"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("phone", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <button
              style={{
                borderRadius: "6px",
                marginTop: "12px",
                backgroundColor: "#05944F",
                boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              disabled={formik.isSubmitting}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Phones = () => {
  const [opt, setOpt] = useState(localStorage.getItem("ContactNumber") || "");

  const {
    state: { user },
  } = useAuth();
  const [deleteContact] = useDeleteContactMutation();
  const [loadingDelete, setLoadingDelete] = useState(-1);
  const { addToast } = useToasts();

  const { data, error, loading } = useGetContactQuery({
    variables: { email: user?.email || "" },
  });
  if (error && !data) {
    console.log(error);
    return <div>Error...</div>;
  }
  if (loading && !data) {
    return <div>Loading...</div>;
  }
  return data?.users[0].phones.map((el: any, idx: any) => {
    return (
      <div
        key={idx}
        onClick={() => {
          localStorage.setItem("ContactNumber", idx);
          localStorage.setItem("ContactNumberInf", JSON.stringify(el));
          setOpt(idx);
        }}
        style={{
          height: "64px",
          maxWidth: "200px",
          padding: "20px",
          backgroundColor:
            opt == idx ? "rgb(255, 255, 255)" : "rgb(246, 246, 246)",
          marginRight: "15px",
          marginBottom: "15px",
          border: `1px solid ${opt == idx ? "rgb(5, 148, 79)" : "transparent"
            }`,
          borderRadius: "5px",
          transition: "all 0.25s ease 0s",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <button
          style={{
            alignItems: "center",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            fontSize: "14px",
            fontWeight: 700,
            color: "rgb(0, 158, 127)",
            lineHeight: "24px",
            cursor: "pointer",
            position: "absolute",
            top: "6px",
            right: "6px",
          }}
          onClick={async () => {
            try {
              setLoadingDelete(idx);
              const dataRes = await deleteContact({
                variables: {
                  email: user?.email || "",
                  index: idx,
                },
                refetchQueries: [
                  {
                    query: GetContactDocument,
                    variables: { email: user?.email || "" },
                  },
                ],
                awaitRefetchQueries: true,
              });
              console.log(dataRes);
              setLoadingDelete(-1);
              addToast("Delete successfull!", {
                appearance: "info",
                autoDismiss: true,
              });
            } catch (error) {
              addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
              });
              setLoadingDelete(-1);
            }
          }}
        >
          x
        </button>
        {loadingDelete == idx ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1
              style={{
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              {el.local}
            </h1>
            <p>{el.phone}</p>
          </>
        )}
      </div>
    );
  });
};
