import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    products(order_by: { createdAt: desc }) {
      id
      name
      pricing
      saleOff
      URLImage
    }
  }
`;
