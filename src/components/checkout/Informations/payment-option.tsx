import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CartContext } from "../../../contexts/cart-context";
import {
  GetPaymentDocument,
  useAddPaymentMutation,
  useGetPaymentQuery,
  useInsertOrderMutation,
} from "../../../graphql/autogenerate/hooks";
import { useAuth } from "../../../hooks/use-auth";
import useMedia from "../../../hooks/use-media";

export const PaymentOption = () => {
  const isWide = useMedia("(min-width: 480px)");
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToasts();
  // const [addPayment] = useAddPaymentMutation();
  const [insertOrderMutation] = useInsertOrderMutation();
  const {
    state: { user, customClaims },
  } = useAuth();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const handleOrder = async () => {
    try {
      const dataRes = await insertOrderMutation({
        variables: {
          contactNumber: JSON.parse(localStorage.getItem("ContactNumberInf") || ""),
          deliveryAddress: JSON.parse(localStorage.getItem("DeliveryAddressInf") || ""),
          deliveryMethod: JSON.parse(localStorage.getItem("DeliveryMethodInf") || ""),
          products: JSON.parse(localStorage.getItem("cart") || ""),
          userId: customClaims?.claims["https://hasura.io/jwt/claims"][
            "x-hasura-user-id-on-db"
          ]
        },
      });
      addToast("Order successfull!", {
        appearance: "info",
        autoDismiss: true,
      });
      navigate("your-order")
      clearCart()
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }

  // const formik: any = useFormik({
  //   initialValues: {
  //     cardNumber: "",
  //     month: "",
  //     year: "",
  //     cvc: "",
  //     nameOfCard: "",
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       formik.setSubmitting(true);
  //       {
  //         /* {cardNumber, month, year, cvc, nameOfCard} */
  //       }

  //       const dataRes = await addPayment({
  //         variables: {
  //           email: user?.email || "",
  //           payment: {
  //             cardNumber: values.cardNumber,
  //             month: values.month,
  //             year: values.year,
  //             cvc: values.cvc,
  //             nameOfCard: values.nameOfCard,
  //           },
  //         },
  //         refetchQueries: [
  //           {
  //             query: GetPaymentDocument,
  //             variables: { email: user?.email || "" },
  //           },
  //         ],
  //         awaitRefetchQueries: true,
  //       });
  //       formik.setSubmitting(false);
  //       addToast("Add successfull!", {
  //         appearance: "info",
  //         autoDismiss: true,
  //       });
  //       setIsOpen(false);
  //       formik.handleReset();
  //     } catch (error) {
  //       addToast(error.message, {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //       formik.setSubmitting(false);
  //     }
  //   },
  // });

  return (
    <div>
      <div
        style={{
          padding: "30px",
          boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.16)",
          backgroundColor: "rgb(255, 255, 255)",
          margin: "10px",
          marginBottom: "98px",
          borderRadius: "5px",
        }}
      >
        {/* <div
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
              4
            </span>
            <strong style={{ paddingLeft: "18px", fontSize: "18px" }}>
              + Add Payment
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
            + Add Payment
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
          <Payments />
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
            Add new payment
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
              name="cardNumber"
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="xxxx xxxx xxxx xxxx"
              onChange={(e) => {
                formik.setFieldValue("cardNumber", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber}
            />
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="month"
              placeholder="Month"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("month", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.month}
            />
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="year"
              placeholder="Year"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("year", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="cvc"
              placeholder="CVC"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("cvc", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cvc}
            />
            <input
              style={{
                borderRadius: "6px",
                padding: "8px 16px",
                margin: "6px 0",
              }}
              required
              name="nameOfCard"
              placeholder="Name of card"
              type="text"
              onChange={(e) => {
                formik.setFieldValue("nameOfCard", e.currentTarget.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.nameOfCard}
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
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            padding: "20px 0",
          }}
        >
          {/* <button className="button-order">Payment -5% of bill</button> */}
          <button className="button-order" onClick={() => handleOrder()} onKeyPress={() => handleOrder()}>Order</button>
        </div>
      </div>
    </div>
  );
};

export const Payments = () => {
  const [opt, setOpt] = useState(localStorage.getItem("PaymentOption") || "");
  const {
    state: { user },
  } = useAuth();
  const { data, error, loading } = useGetPaymentQuery({
    variables: { email: user?.email || "" },
  });
  if (error && !data) {
    console.log(error);
    return <div>Error...</div>;
  }
  if (loading && !data) {
    return <div>Loading...</div>;
  }
  return data?.users[0].payment.map((el: any, idx: string) => {
    return (
      <div
        key={idx}
        onClick={() => {
          localStorage.setItem("PaymentOption", idx);
          setOpt(idx);
        }}
        style={{
          height: "64px",
          maxWidth: "200px",
          padding: "20px",
          backgroundColor:
            opt === idx ? "rgb(255, 255, 255)" : "rgb(246, 246, 246)",
          marginRight: "15px",
          marginBottom: "15px",
          border: `1px solid ${opt === idx ? "rgb(5, 148, 79)" : "transparent"
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
          {el.label}
        </h1>
        <p>{el.cardNumber + el.month + el.year + el.cvc + el.nameOfCard}</p>
      </div>
    );
  });
};
