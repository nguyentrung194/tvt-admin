import React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import {
  ProductsDocument,
  useDeleteProductByPkMutation,
  useUpdateProductByPkMutation,
} from "../../../graphql/autogenerate/hooks";
import { storage, useAuth } from "../../../hooks/use-auth";
import { useQueryURL } from "../../../hooks/use-query-url";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { LIMIT } from "./list";

export const Product = ({ product }: any) => {
  const { addToast } = useToasts();

  const [updateProduct] = useUpdateProductByPkMutation();
  const [deleteProduct] = useDeleteProductByPkMutation();

  const {
    state: { user },
  }: any = useAuth();
  const query = useQueryURL();
  const location = useLocation();

  const queryParams: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const page = parseInt(queryParams.page) || 1;

  const formik: any = useFormik({
    initialValues: {
      name: product.name,
      URLImage: product.URLImage,
      pricing: product.pricing,
      saleOff: product.saleOff,
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        addToast("This can take a few seconds", {
          appearance: "info",
          autoDismiss: true,
        });
        const dataRes = await updateProduct({
          variables: {
            id: product.id,
            name: values.name,
            URLImage: values.URLImage,
            pricing: values.pricing,
            saleOff: values.saleOff,
          },
        });
        console.log(dataRes);
        if (dataRes && dataRes.data) {
          addToast("Update successfull!", {
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
  const handleDelete = async (values: any) => {
    try {
      formik.setSubmitting(true);
      addToast("This can take a few seconds", {
        appearance: "info",
        autoDismiss: true,
      });
      const dataRes = await deleteProduct({
        variables: {
          id: product.id,
        },
        refetchQueries: [
          {
            query: ProductsDocument,
            variables: {
              limit: LIMIT,
              offset: LIMIT * page - LIMIT,
              order_by: {
                createdAt: query.get("sortbydate") || ("desc" as any),
              },
              where: {
                _and: [
                  {
                    _or: queryParams.categories
                      ? queryParams.categories.split(",").map((item: any) => ({
                          categories_products: {
                            category: { name: { _eq: item } },
                          },
                        }))
                      : {},
                  },
                  {
                    _or: [
                      {
                        name: {
                          _ilike: `%${query.get("search") || ""}%`,
                        },
                      },
                      {
                        name: {
                          _iregex: `^${(query.get("search") || "")
                            ?.split("")
                            .filter((el) => el !== " ")
                            .map((el) => `(${el}){1}.*`)
                            .join(`\\s`)}$`,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      });
      console.log(dataRes);
      if (dataRes && dataRes.data?.delete_products_by_pk?.id) {
        addToast("Add successfull!", {
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
  };

  return (
    <form
      style={{ width: "100%", textAlign: "left" }}
      onSubmit={formik.handleSubmit}
    >
      <div key={product.key} className="wrapper">
        <div>
          <img
            style={{
              width: "100%",
            }}
            src={product.URLImage}
            alt={product.name}
          />
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "20px",
            textAlign: "center",
          }}
        >
          <input
            style={{ width: "91%", padding: "8px 16px", margin: "6px 0" }}
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        <div
          style={{
            padding: "6px",
            fontSize: "14px",
          }}
        >
          <p
            style={{
              width: "100%",
            }}
          >
            <input
              style={{ width: "60%", padding: "8px 16px", margin: "6px 0" }}
              name="saleOff"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.saleOff}
            />
          </p>
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            lineHeight: "24px",
          }}
        >
          <input
            style={{ width: "60%", padding: "8px 16px", margin: "6px 0" }}
            name="pricing"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pricing}
          />
        </div>
        <div>
          <span>Image Product: </span>
          <input
            name="URLImage"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(e) => {
              console.log(storage);
              const uploadFiles = Array.from(e.target.files as FileList).map(
                async (file: File) => {
                  formik.setSubmitting(true);
                  const storageRef = storage.ref();
                  const ref = storageRef.child(`assert/${file.name}`);
                  const metadata = {
                    uid: user.uid,
                    size: file.size,
                    contentType: file.type,
                    name: file.name,
                  };
                  await ref.put(file, metadata);
                  const assetUrl = await ref.getDownloadURL();
                  formik.setSubmitting(false);
                  return { ...metadata, assetUrl };
                }
              );
              console.log(uploadFiles);
              Promise.all(uploadFiles)
                .then(async (result) => {
                  formik.setFieldValue("URLImage", result[0].assetUrl);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          />
        </div>
        <div>
          <button
            className="button-summit"
            style={{
              backgroundColor: "#05944F",
            }}
            disabled={formik.isSubmitting}
            type="submit"
          >
            Cập nhật sản phẩm
          </button>
        </div>
        <div>
          <button
            className="button-summit"
            style={{
              backgroundColor: "#ff2252",
            }}
            onClick={handleDelete}
            disabled={formik.isSubmitting}
          >
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </form>
  );
};
