import React from "react";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useAuth, storage, fbase, fana } from "../../hooks/use-auth";
import useMedia from "../../hooks/use-media";
import { useToasts } from "react-toast-notifications";

export const SetupAccount = () => {
  const isWide = useMedia("(min-width: 480px)");
  const { addToast } = useToasts();

  const [userSetup] = useMutation(gql`
    mutation UserSetup($input: UserSetupInput!) {
      userSetup(input: $input) {
        status
        statusCode
        message
      }
    }
  `);

  const {
    state: { user },
    signout,
  }: any = useAuth();

  const formik: any = useFormik({
    initialValues: {
      type: "USER",
      countryCode: "94000",
      country: "Viet Nam",
      dial: "+84",
      fullName: "",
      avatarURL: "",
      countryUser: "",
      phone: "",
      city: "Can Tho",
      district: "Ninh Kieu",
      commune: "Vo Anh Kiet stress",
      label: "Home",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        addToast("This can take a few seconds", {
          appearance: "info",
          autoDismiss: true,
        });
        const token: string = await user.getIdToken();
        console.log(token);
        const dataRes = await userSetup({
          variables: {
            input: {
              token,
              displayName: values.fullName,
              roles: values.type,
              avatarUrl: values.avatarURL,
              country: values.country,
              countryCode: values.countryCode,
              phones: [{ local: "Home", phone: values.phone }],
              dialCode: values.dial,
              address: [
                {
                  city: values.city,
                  district: values.district,
                  commune: values.commune,
                  label: values.label,
                },
              ],
            },
          },
        });
        console.log(dataRes);
        if (dataRes && dataRes.data.userSetup.status === "success") {
          await user.updateProfile({
            displayName: values.fullName,
            photoURL: values.avatarURL,
          });
          fbase
            .auth()
            .currentUser?.getIdToken(true)
            .then(function () {
              fana.setUserProperties({
                role: "MOD",
              });
              return window.location.reload();
            })
            .catch(function (error) {
              console.log("Error!\n", error.message);
            });
          addToast("Setup successfull!", {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          console.log("Error on server backend!");
        }
        formik.setSubmitting(false);
      } catch (error) {
        console.log(error);
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      }
    },
  });

  return (
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
          }}
        >
          Setup your account
        </div>
        <form
          style={{ width: "100%", textAlign: "left" }}
          onSubmit={formik.handleSubmit}
        >
          <input
            style={{ width: "91%", padding: "8px 16px", margin: "6px 0" }}
            required
            name="fullName"
            placeholder="First & last name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Where are you from?</span>
            <select
              style={{
                border: "1px solid #e2eded",
                outline: "none",
                padding: "4px 8px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              required
              placeholder="Select country"
              onChange={({ value }: any) =>
                formik.setFieldValue("country", value)
              }
              value={formik.values.country === "" ? "" : formik.values.country}
            >
              <option value="Viet Nam">Viet Nam</option>
              <option value="Foreign">Foreign</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Photo: </span>
            <input
              required
              name="avatarURL"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => {
                console.log(storage);
                const uploadFiles = Array.from(e.target.files as FileList).map(
                  async (file: File) => {
                    const storageRef = storage.ref();
                    const ref = storageRef.child(
                      `users/${user.uid}/avatar/${file.name}`
                    );
                    const metadata = {
                      uid: user.uid,
                      size: file.size,
                      contentType: file.type,
                      name: file.name,
                    };
                    await ref.put(file, metadata);
                    const assetUrl = await ref.getDownloadURL();
                    return { ...metadata, assetUrl };
                  }
                );
                console.log(uploadFiles);
                Promise.all(uploadFiles)
                  .then(async (result) => {
                    formik.setFieldValue("avatarURL", result[0].assetUrl);
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }}
            />
          </div>
          <input
            style={{ width: "90%", padding: "8px 16px", margin: "6px 0" }}
            required
            value={formik.values.phone !== "" ? formik.values.phone : ""}
            onChange={(e) => {
              formik.setFieldValue("phone", e.currentTarget.value);
            }}
            placeholder="Your phone number"
          />
          <button
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
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </button>
          <button
            style={{
              width: "100%",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
              borderBottomLeftRadius: "6px",
              marginTop: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
              padding: "8px 16px",
              margin: "6px 0",
            }}
            onClick={signout}
          >
            Not you
          </button>
        </form>
      </div>
    </div>
  );
};
