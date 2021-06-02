import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};

export const InsertOrderDocument = gql`
  mutation InsertOrder(
    $deliveryAddress: jsonb!
    $contactNumber: jsonb!
    $deliveryMethod: jsonb!
    $paymentOption: jsonb
    $products: jsonb!
    $userId: String!
  ) {
    insert_orders_one(
      object: {
        deliveryAddress: $deliveryAddress
        contactNumber: $contactNumber
        deliveryMethod: $deliveryMethod
        paymentOption: $paymentOption
        products: $products
        userId: $userId
      }
    ) {
      id
    }
  }
`;
export type InsertOrderMutationFn = Apollo.MutationFunction<
  Types.InsertOrderMutation,
  Types.InsertOrderMutationVariables
>;

/**
 * __useInsertOrderMutation__
 *
 * To run a mutation, you first call `useInsertOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOrderMutation, { data, loading, error }] = useInsertOrderMutation({
 *   variables: {
 *      deliveryAddress: // value for 'deliveryAddress'
 *      contactNumber: // value for 'contactNumber'
 *      deliveryMethod: // value for 'deliveryMethod'
 *      paymentOption: // value for 'paymentOption'
 *      products: // value for 'products'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useInsertOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.InsertOrderMutation,
    Types.InsertOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.InsertOrderMutation,
    Types.InsertOrderMutationVariables
  >(InsertOrderDocument, options);
}
export type InsertOrderMutationHookResult = ReturnType<
  typeof useInsertOrderMutation
>;
export type InsertOrderMutationResult =
  Apollo.MutationResult<Types.InsertOrderMutation>;
export type InsertOrderMutationOptions = Apollo.BaseMutationOptions<
  Types.InsertOrderMutation,
  Types.InsertOrderMutationVariables
>;
export const ProductsDocument = gql`
  query Products(
    $where: products_bool_exp!
    $order_by: products_order_by!
    $limit: Int! = 10
    $offset: Int! = 0
  ) {
    products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    products(
      order_by: [$order_by]
      where: $where
      limit: $limit
      offset: $offset
    ) {
      id
      name
      pricing
      saleOff
      URLImage
    }
  }
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      order_by: // value for 'order_by'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ProductsQuery,
    Types.ProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(
    ProductsDocument,
    options
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ProductsQuery,
    Types.ProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(
    ProductsDocument,
    options
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  Types.ProductsQuery,
  Types.ProductsQueryVariables
>;
export const GetProductsDocument = gql`
  query GetProducts {
    products(order_by: { createdAt: desc }) {
      id
      name
      pricing
      saleOff
      URLImage
    }
  }
`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetProductsQuery,
    Types.GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetProductsQuery,
    Types.GetProductsQueryVariables
  >(GetProductsDocument, options);
}
export function useGetProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetProductsQuery,
    Types.GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetProductsQuery,
    Types.GetProductsQueryVariables
  >(GetProductsDocument, options);
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsQueryResult = Apollo.QueryResult<
  Types.GetProductsQuery,
  Types.GetProductsQueryVariables
>;
export const ProductsByCategoryDocument = gql`
  query ProductsByCategory($category: String!) {
    products(
      where: { categories_products: { category: { name: { _eq: $category } } } }
    ) {
      id
      name
      URLImage
      pricing
      saleOff
    }
  }
`;

/**
 * __useProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useProductsByCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ProductsByCategoryQuery,
    Types.ProductsByCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ProductsByCategoryQuery,
    Types.ProductsByCategoryQueryVariables
  >(ProductsByCategoryDocument, options);
}
export function useProductsByCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ProductsByCategoryQuery,
    Types.ProductsByCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ProductsByCategoryQuery,
    Types.ProductsByCategoryQueryVariables
  >(ProductsByCategoryDocument, options);
}
export type ProductsByCategoryQueryHookResult = ReturnType<
  typeof useProductsByCategoryQuery
>;
export type ProductsByCategoryLazyQueryHookResult = ReturnType<
  typeof useProductsByCategoryLazyQuery
>;
export type ProductsByCategoryQueryResult = Apollo.QueryResult<
  Types.ProductsByCategoryQuery,
  Types.ProductsByCategoryQueryVariables
>;
export const InsertProductDocument = gql`
  mutation InsertProduct(
    $categories_name: String!
    $URLImage: String!
    $name: String!
    $pricing: Int!
    $saleOff: Int!
  ) {
    insert_products(
      objects: {
        categories_products: {
          data: { category: { data: { name: $categories_name } } }
        }
        URLImage: $URLImage
        name: $name
        pricing: $pricing
        saleOff: $saleOff
      }
    ) {
      affected_rows
    }
  }
`;
export type InsertProductMutationFn = Apollo.MutationFunction<
  Types.InsertProductMutation,
  Types.InsertProductMutationVariables
>;

/**
 * __useInsertProductMutation__
 *
 * To run a mutation, you first call `useInsertProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProductMutation, { data, loading, error }] = useInsertProductMutation({
 *   variables: {
 *      categories_name: // value for 'categories_name'
 *      URLImage: // value for 'URLImage'
 *      name: // value for 'name'
 *      pricing: // value for 'pricing'
 *      saleOff: // value for 'saleOff'
 *   },
 * });
 */
export function useInsertProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.InsertProductMutation,
    Types.InsertProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.InsertProductMutation,
    Types.InsertProductMutationVariables
  >(InsertProductDocument, options);
}
export type InsertProductMutationHookResult = ReturnType<
  typeof useInsertProductMutation
>;
export type InsertProductMutationResult =
  Apollo.MutationResult<Types.InsertProductMutation>;
export type InsertProductMutationOptions = Apollo.BaseMutationOptions<
  Types.InsertProductMutation,
  Types.InsertProductMutationVariables
>;
export const UpdateProductByPkDocument = gql`
  mutation UpdateProductByPK(
    $id: uuid!
    $URLImage: String!
    $name: String!
    $pricing: Int!
    $saleOff: Int!
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        pricing: $pricing
        saleOff: $saleOff
        URLImage: $URLImage
      }
    ) {
      id
    }
  }
`;
export type UpdateProductByPkMutationFn = Apollo.MutationFunction<
  Types.UpdateProductByPkMutation,
  Types.UpdateProductByPkMutationVariables
>;

/**
 * __useUpdateProductByPkMutation__
 *
 * To run a mutation, you first call `useUpdateProductByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductByPkMutation, { data, loading, error }] = useUpdateProductByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      URLImage: // value for 'URLImage'
 *      name: // value for 'name'
 *      pricing: // value for 'pricing'
 *      saleOff: // value for 'saleOff'
 *   },
 * });
 */
export function useUpdateProductByPkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateProductByPkMutation,
    Types.UpdateProductByPkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateProductByPkMutation,
    Types.UpdateProductByPkMutationVariables
  >(UpdateProductByPkDocument, options);
}
export type UpdateProductByPkMutationHookResult = ReturnType<
  typeof useUpdateProductByPkMutation
>;
export type UpdateProductByPkMutationResult =
  Apollo.MutationResult<Types.UpdateProductByPkMutation>;
export type UpdateProductByPkMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateProductByPkMutation,
  Types.UpdateProductByPkMutationVariables
>;
export const UpdateProductsDocument = gql`
  mutation UpdateProducts(
    $id: uuid!
    $URLImage: String!
    $name: String!
    $pricing: Int!
    $saleOff: Int!
  ) {
    update_products(
      where: { id: { _eq: $id } }
      _set: {
        URLImage: $URLImage
        name: $name
        pricing: $pricing
        saleOff: $saleOff
      }
    ) {
      returning {
        id
      }
    }
  }
`;
export type UpdateProductsMutationFn = Apollo.MutationFunction<
  Types.UpdateProductsMutation,
  Types.UpdateProductsMutationVariables
>;

/**
 * __useUpdateProductsMutation__
 *
 * To run a mutation, you first call `useUpdateProductsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductsMutation, { data, loading, error }] = useUpdateProductsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      URLImage: // value for 'URLImage'
 *      name: // value for 'name'
 *      pricing: // value for 'pricing'
 *      saleOff: // value for 'saleOff'
 *   },
 * });
 */
export function useUpdateProductsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateProductsMutation,
    Types.UpdateProductsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateProductsMutation,
    Types.UpdateProductsMutationVariables
  >(UpdateProductsDocument, options);
}
export type UpdateProductsMutationHookResult = ReturnType<
  typeof useUpdateProductsMutation
>;
export type UpdateProductsMutationResult =
  Apollo.MutationResult<Types.UpdateProductsMutation>;
export type UpdateProductsMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateProductsMutation,
  Types.UpdateProductsMutationVariables
>;
export const DeleteProductByPkDocument = gql`
  mutation DeleteProductByPK($id: uuid!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;
export type DeleteProductByPkMutationFn = Apollo.MutationFunction<
  Types.DeleteProductByPkMutation,
  Types.DeleteProductByPkMutationVariables
>;

/**
 * __useDeleteProductByPkMutation__
 *
 * To run a mutation, you first call `useDeleteProductByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductByPkMutation, { data, loading, error }] = useDeleteProductByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductByPkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteProductByPkMutation,
    Types.DeleteProductByPkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteProductByPkMutation,
    Types.DeleteProductByPkMutationVariables
  >(DeleteProductByPkDocument, options);
}
export type DeleteProductByPkMutationHookResult = ReturnType<
  typeof useDeleteProductByPkMutation
>;
export type DeleteProductByPkMutationResult =
  Apollo.MutationResult<Types.DeleteProductByPkMutation>;
export type DeleteProductByPkMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteProductByPkMutation,
  Types.DeleteProductByPkMutationVariables
>;
export const GetAddressDocument = gql`
  query GetAddress($email: String!) {
    users(where: { email: { _eq: $email } }) {
      address
    }
  }
`;

/**
 * __useGetAddressQuery__
 *
 * To run a query within a React component, call `useGetAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetAddressQuery,
    Types.GetAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetAddressQuery, Types.GetAddressQueryVariables>(
    GetAddressDocument,
    options
  );
}
export function useGetAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAddressQuery,
    Types.GetAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetAddressQuery,
    Types.GetAddressQueryVariables
  >(GetAddressDocument, options);
}
export type GetAddressQueryHookResult = ReturnType<typeof useGetAddressQuery>;
export type GetAddressLazyQueryHookResult = ReturnType<
  typeof useGetAddressLazyQuery
>;
export type GetAddressQueryResult = Apollo.QueryResult<
  Types.GetAddressQuery,
  Types.GetAddressQueryVariables
>;
export const AddAddressDocument = gql`
  mutation AddAddress($address: jsonb!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _append: { address: $address }
    ) {
      affected_rows
    }
  }
`;
export type AddAddressMutationFn = Apollo.MutationFunction<
  Types.AddAddressMutation,
  Types.AddAddressMutationVariables
>;

/**
 * __useAddAddressMutation__
 *
 * To run a mutation, you first call `useAddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAddressMutation, { data, loading, error }] = useAddAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddAddressMutation,
    Types.AddAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddAddressMutation,
    Types.AddAddressMutationVariables
  >(AddAddressDocument, options);
}
export type AddAddressMutationHookResult = ReturnType<
  typeof useAddAddressMutation
>;
export type AddAddressMutationResult =
  Apollo.MutationResult<Types.AddAddressMutation>;
export type AddAddressMutationOptions = Apollo.BaseMutationOptions<
  Types.AddAddressMutation,
  Types.AddAddressMutationVariables
>;
export const DeleteAddressDocument = gql`
  mutation DeleteAddress($index: Int!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _delete_elem: { address: $index }
    ) {
      affected_rows
    }
  }
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<
  Types.DeleteAddressMutation,
  Types.DeleteAddressMutationVariables
>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      index: // value for 'index'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteAddressMutation,
    Types.DeleteAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteAddressMutation,
    Types.DeleteAddressMutationVariables
  >(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<
  typeof useDeleteAddressMutation
>;
export type DeleteAddressMutationResult =
  Apollo.MutationResult<Types.DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteAddressMutation,
  Types.DeleteAddressMutationVariables
>;
export const GetContactDocument = gql`
  query GetContact($email: String!) {
    users(where: { email: { _eq: $email } }) {
      phones
    }
  }
`;

/**
 * __useGetContactQuery__
 *
 * To run a query within a React component, call `useGetContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetContactQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetContactQuery,
    Types.GetContactQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetContactQuery, Types.GetContactQueryVariables>(
    GetContactDocument,
    options
  );
}
export function useGetContactLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetContactQuery,
    Types.GetContactQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetContactQuery,
    Types.GetContactQueryVariables
  >(GetContactDocument, options);
}
export type GetContactQueryHookResult = ReturnType<typeof useGetContactQuery>;
export type GetContactLazyQueryHookResult = ReturnType<
  typeof useGetContactLazyQuery
>;
export type GetContactQueryResult = Apollo.QueryResult<
  Types.GetContactQuery,
  Types.GetContactQueryVariables
>;
export const AddContactDocument = gql`
  mutation AddContact($phones: jsonb!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _append: { phones: $phones }
    ) {
      affected_rows
    }
  }
`;
export type AddContactMutationFn = Apollo.MutationFunction<
  Types.AddContactMutation,
  Types.AddContactMutationVariables
>;

/**
 * __useAddContactMutation__
 *
 * To run a mutation, you first call `useAddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContactMutation, { data, loading, error }] = useAddContactMutation({
 *   variables: {
 *      phones: // value for 'phones'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddContactMutation,
    Types.AddContactMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddContactMutation,
    Types.AddContactMutationVariables
  >(AddContactDocument, options);
}
export type AddContactMutationHookResult = ReturnType<
  typeof useAddContactMutation
>;
export type AddContactMutationResult =
  Apollo.MutationResult<Types.AddContactMutation>;
export type AddContactMutationOptions = Apollo.BaseMutationOptions<
  Types.AddContactMutation,
  Types.AddContactMutationVariables
>;
export const DeleteContactDocument = gql`
  mutation DeleteContact($index: Int!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _delete_elem: { phones: $index }
    ) {
      affected_rows
    }
  }
`;
export type DeleteContactMutationFn = Apollo.MutationFunction<
  Types.DeleteContactMutation,
  Types.DeleteContactMutationVariables
>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      index: // value for 'index'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteContactMutation,
    Types.DeleteContactMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteContactMutation,
    Types.DeleteContactMutationVariables
  >(DeleteContactDocument, options);
}
export type DeleteContactMutationHookResult = ReturnType<
  typeof useDeleteContactMutation
>;
export type DeleteContactMutationResult =
  Apollo.MutationResult<Types.DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteContactMutation,
  Types.DeleteContactMutationVariables
>;
export const GetPaymentDocument = gql`
  query GetPayment($email: String!) {
    users(where: { email: { _eq: $email } }) {
      payment
    }
  }
`;

/**
 * __useGetPaymentQuery__
 *
 * To run a query within a React component, call `useGetPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetPaymentQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPaymentQuery,
    Types.GetPaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetPaymentQuery, Types.GetPaymentQueryVariables>(
    GetPaymentDocument,
    options
  );
}
export function useGetPaymentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPaymentQuery,
    Types.GetPaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetPaymentQuery,
    Types.GetPaymentQueryVariables
  >(GetPaymentDocument, options);
}
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<
  typeof useGetPaymentLazyQuery
>;
export type GetPaymentQueryResult = Apollo.QueryResult<
  Types.GetPaymentQuery,
  Types.GetPaymentQueryVariables
>;
export const AddPaymentDocument = gql`
  mutation AddPayment($payment: jsonb!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _append: { payment: $payment }
    ) {
      affected_rows
    }
  }
`;
export type AddPaymentMutationFn = Apollo.MutationFunction<
  Types.AddPaymentMutation,
  Types.AddPaymentMutationVariables
>;

/**
 * __useAddPaymentMutation__
 *
 * To run a mutation, you first call `useAddPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMutation, { data, loading, error }] = useAddPaymentMutation({
 *   variables: {
 *      payment: // value for 'payment'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddPaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddPaymentMutation,
    Types.AddPaymentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddPaymentMutation,
    Types.AddPaymentMutationVariables
  >(AddPaymentDocument, options);
}
export type AddPaymentMutationHookResult = ReturnType<
  typeof useAddPaymentMutation
>;
export type AddPaymentMutationResult =
  Apollo.MutationResult<Types.AddPaymentMutation>;
export type AddPaymentMutationOptions = Apollo.BaseMutationOptions<
  Types.AddPaymentMutation,
  Types.AddPaymentMutationVariables
>;
export const DeletePaymentDocument = gql`
  mutation DeletePayment($index: Int!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _delete_elem: { payment: $index }
    ) {
      affected_rows
    }
  }
`;
export type DeletePaymentMutationFn = Apollo.MutationFunction<
  Types.DeletePaymentMutation,
  Types.DeletePaymentMutationVariables
>;

/**
 * __useDeletePaymentMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMutation, { data, loading, error }] = useDeletePaymentMutation({
 *   variables: {
 *      index: // value for 'index'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeletePaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeletePaymentMutation,
    Types.DeletePaymentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeletePaymentMutation,
    Types.DeletePaymentMutationVariables
  >(DeletePaymentDocument, options);
}
export type DeletePaymentMutationHookResult = ReturnType<
  typeof useDeletePaymentMutation
>;
export type DeletePaymentMutationResult =
  Apollo.MutationResult<Types.DeletePaymentMutation>;
export type DeletePaymentMutationOptions = Apollo.BaseMutationOptions<
  Types.DeletePaymentMutation,
  Types.DeletePaymentMutationVariables
>;
