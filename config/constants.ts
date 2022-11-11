export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const API_URL = {
  USERS: {
    SIGN_IN: {
      URL: "/auth/login",
      METHOD: "POST",
    },
    GET: {
      BY_ID: {
        URL: "/users/", //+id
        METHOD: "GET",
      },
    },
  },
  PRODUCTS: {
    GET: {
      ALL: {
        URL: "/products",
        METHOD: "GET",
        BY_CATEGORY: {
          URL: "/products/category/", //+category
          METHOD: "GET",
        },
      },
      BY_ID: {
        URL: "/products/", //+id
        METHOD: "GET",
      },
    },
    SEARCH: {
      BY_TEXT: {
        URL: "/products/search?q=", //+text
        METHOD: "GET",
      },
    },
    CATEGORIES: {
      GET: {
        ALL: {
          URL: "/products/categories",
          METHOD: "GET",
        },
      },
    },
  },
};
