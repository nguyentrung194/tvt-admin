import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryURL } from "../../hooks/use-query-url";
import searchIcon from "./search.svg";

export const FilterProduct: React.FC<{}> = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();

  const [search, setSearch] = React.useState(query.get("search") || "");
  const [categories, setCategories] = React.useState(
    query.get("categories") ? [query.get("categories")] : []
  );
  return (
    <>
      <div
        style={{
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              query.delete("page");
              query.set("search", search);
              history(`/?${query}`);
            }}
            style={{
              backgroundColor: "rgba(204, 204, 204, 0.466)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "12px",
              margin: "6px",
            }}
          >
            <span>
              <img
                style={{ width: "14px", paddingRight: "4px" }}
                src={searchIcon}
                alt="Logo"
              />
            </span>
            <input
              style={{
                border: "none",
                outline: "none",
                width: "100px",
                backgroundColor: "transparent",
              }}
              name="search"
              type="text"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                if (!e.target.value) {
                  query.delete("search");
                  history(`${location.pathname}?${query}`);
                }
              }}
            />
          </form>
          <div>
            <select
              style={{
                margin: "6px",
                outline: "none",
                padding: "12px",
                border: "none",
              }}
              onChange={({ target: { value } }: any) => {
                query.delete("page");
                setCategories([value]);
                if (value === "all") {
                  query.delete("categories");
                  history(`/?${query}`);
                } else if (value) {
                  query.set("categories", value);
                  history(`/?${query}`);
                }
              }}
              placeholder="Filter by categories"
              name="categories"
              value={categories[0] as any}
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
        </div>
      </div>
    </>
  );
};
