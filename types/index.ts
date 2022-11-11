export enum Categories {
  SMARTPHONES = "smartphones",
  LAPTOPS = "laptops",
  FRAGRANCES = "fragrances",
  SKINCARE = "skincare",
  GROCERIES = "groceries",
  HOME_DECORATION = "home-decoration",
  FURNITURE = "furniture",
  TOPS = "tops",
  WOMENS_DRESSES = "womens-dresses",
  WOMENS_SHOES = "womens-shoes",
  WOMENS_WATCHES = "womens-watches",
  WOMENS_BAGS = "womens-bags",
  WOMENS_JEWELLERY = "womens-jewellery",
  MENS_SHIRTS = "mens-shirts",
  MENS_SHOES = "mens-shoes",
  MENS_WATCHES = "mens-watches",
  SUNGLASSES = "sunglasses",
  AUTOMOTIVE = "automotive",
  MOTORCYCLE = "motorcycle",
  LIGHTING = "lighting",
}

export type CategoriesListType = [
  Categories.AUTOMOTIVE,
  Categories.FRAGRANCES,
  Categories.FURNITURE,
  Categories.GROCERIES,
  Categories.HOME_DECORATION,
  Categories.LAPTOPS,
  Categories.LIGHTING,
  Categories.MENS_SHIRTS,
  Categories.MENS_SHOES,
  Categories.MENS_WATCHES,
  Categories.MOTORCYCLE,
  Categories.SKINCARE,
  Categories.SMARTPHONES,
  Categories.SUNGLASSES,
  Categories.TOPS,
  Categories.WOMENS_BAGS,
  Categories.WOMENS_DRESSES,
  Categories.WOMENS_JEWELLERY,
  Categories.WOMENS_SHOES,
  Categories.WOMENS_WATCHES
];

export type ModeType = "dark" | "light";

export type PageType = "home" | "signin" | "signup" | "profile" | "checkout";
