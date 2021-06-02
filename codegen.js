module.exports = {
  schema: [
    {
      "https://fashion-trend-v2.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret":
            "J1oJSVrvLVALaidFEH0SJuC2ZJ9D9mEDACx0i4xCpEldNZyouGKvFWHe7LaxxtWH",
        },
      },
    },
  ],
  overwrite: true,
  // Format files
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    // Get schemas from server
    "src/graphql/autogenerate/schemas.tsx": {
      documents: "src/graphql/queries/**/**.gql",
      plugins: ["typescript"],
    },
    // Create operations based on queries
    "src/graphql/autogenerate/operations.tsx": {
      documents: "src/graphql/queries/**/**.gql",
      preset: "import-types",
      presetConfig: {
        typesPath: "./schemas",
      },
      plugins: ["typescript-operations"],
    },
    // 1. Export GraphQL documents
    // 2. React interface
    "src/graphql/autogenerate/hooks.tsx": {
      documents: "src/graphql/queries/**/**.gql",
      preset: "import-types",
      presetConfig: {
        typesPath: "./operations",
      },
      plugins: ["typescript-react-apollo"],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
      },
    },
  },
};
