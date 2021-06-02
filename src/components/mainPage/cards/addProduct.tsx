import React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import {
  ProductsDocument,
  useInsertProductMutation,
} from "../../../graphql/autogenerate/hooks";
import { storage, useAuth } from "../../../hooks/use-auth";
import { useQueryURL } from "../../../hooks/use-query-url";
import { useLocation } from "react-router-dom";
import { LIMIT } from "./list";
import qs from "qs";
import { values } from "lodash";

export const AddProduct = () => {
  const { addToast } = useToasts();

  const [addProduct] = useInsertProductMutation();
  const query = useQueryURL();
  const location = useLocation();

  const queryParams: any = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const page = parseInt(queryParams.page) || 1;

  const {
    state: { user },
  }: any = useAuth();

  const formik: any = useFormik({
    initialValues: {
      name: "",
      URLImage: "",
      pricing: 0,
      saleOff: 0,
      categories_name: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        addToast("This can take a few seconds", {
          appearance: "info",
          autoDismiss: true,
        });
        const dataRes = await addProduct({
          variables: {
            name: values.name,
            URLImage: values.URLImage,
            pricing: values.pricing,
            saleOff: values.saleOff,
            categories_name: values.categories_name,
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
                        ? queryParams.categories
                            .split(",")
                            .map((item: any) => ({
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
        if (dataRes && dataRes.data) {
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
    },
  });

  return (
    <div
      className="list-container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "auto",
        margin: "6px",
      }}
    >
      <div
        className="wrapper"
        style={{
          gridTemplateColumns: "15% 10% 10% 15% 30% 20%",
        }}
      >
        <div>Tên sản phẩm</div>
        <div>Giảm giá (%)</div>
        <div>Giá sản phẩm (Giá gốc)</div>
        <div>Danh mục sản phẩm</div>
        <div>Hình ảnh sản phẩm</div>
        <div>Hành động</div>
      </div>
      <form
        style={{ width: "100%", textAlign: "left" }}
        onSubmit={formik.handleSubmit}
      >
        <div
          className="wrapper"
          style={{ gridTemplateColumns: "15% 10% 10% 15% 30% 20%" }}
        >
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
            <select
              style={{
                margin: "14px",
                outline: "none",
                border: "none",
              }}
              onChange={({ target: { value } }: any) => {
                formik.setFieldValue("categories_name", value);
              }}
              name="categories"
              value={formik.values.categories_name}
              size={1}
            >
              <option value="all">All</option>
              <option value="Áo khoác">Áo khoác</option>
              <option value="Áo sơ mi">Áo sơ mi</option>
              <option value="Áo thun">Áo thun</option>
              <option value="Quần dài">Quần dài</option>
              <option value="Shorts">Shorts</option>
              <option value="Sport wear">Sport wear</option>
              <option value="Phụ kiện">Phụ kiện</option>
            </select>
          </div>
          <div>
            <span>Image Product: </span>
            <input
              name="URLImage"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => {
                console.log(storage);
                formik.setSubmitting(true);
                const uploadFiles = Array.from(e.target.files as FileList).map(
                  async (file: File) => {
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
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
