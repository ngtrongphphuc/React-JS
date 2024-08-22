export const ROUTE_PATH = {
  HOME: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  CART: "/cart",
  CHECKOUT: "/checkout",
  THANK_YOU: "/thank-you",
  PRODUCT_DETAIL: (param) => `/products/${param}`,

  DASHBOARD: "/admin",
  CATEGORY_MANAGEMENT: "/admin/category",
  ADD_CATEGORY: "/admin/category/add",
  EDIT_CATEGORY: (param) => `/admin/category/${param}/edit`,

  PRODUCT_MANAGEMENT: "/admin/product",
  ADD_PRODUCT: "/admin/product/add",
  EDIT_PRODUCT: (param) => `/admin/product/${param}/edit`,
};
