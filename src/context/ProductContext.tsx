import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axiosApi from "../api/axios-api";
import { ShippingStockResponseModel } from "../models/CategoryModel";
import { Category, ProductModel } from "../models/ProductModel";
import { useLoading } from "../hooks/useLoading";
import { CartProductModel } from "../models/CartModel";
import { getPriceAfterDiscount } from "../utils/helpers";

// Category
interface CategoryState {
  categories: Category[];
  shippingStatus: string[];
  stockStatus: string[];
  loading: boolean;
  error: string | null;
}

interface CategoryAction {
  type:
    | "FETCH_CTG_SUCCESS"
    | "FETCH_CTG_FAILURE"
    | "FETCH_SHIP_SUCCESS"
    | "FETCH_STOCK_SUCCESS"
    | "FETCH_SHIP_STOCK_FAILURE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialCategoryState: CategoryState = {
  categories: [],
  shippingStatus: [],
  stockStatus: [],
  loading: true,
  error: null,
};

const categoryReducer = (
  state: CategoryState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case "FETCH_CTG_SUCCESS":
      return { ...state, categories: action.payload, loading: false };
    case "FETCH_CTG_FAILURE":
      return { ...state, error: action.payload.message, loading: false };
    case "FETCH_SHIP_SUCCESS":
      return { ...state, shippingStatus: action.payload, loading: false };
    case "FETCH_STOCK_SUCCESS":
      return { ...state, stockStatus: action.payload, loading: false };
    case "FETCH_SHIP_STOCK_FAILURE":
      return { ...state, error: action.payload.message, loading: false };
    default:
      return state;
  }
};

// Products
interface ProductState {
  products: ProductModel[];
  loading: boolean;
  error: string | null;
}

interface ProductAction {
  type: "FETCH_PROD_SUCCESS" | "FETCH_PROD_FAILURE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialProductState: ProductState = {
  products: [],
  loading: true,
  error: null,
};

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PROD_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_PROD_FAILURE":
      return { ...state, error: action.payload.message, loading: false };
    default:
      return state;
  }
};

// Filter
interface FilterState {
  byPrice: string;
  byStock: string[];
  byShipping: string[];
  byRating: number;
  bySearch: string;
  byCategory: string;
  reset: boolean;
}

interface FilterActions {
  type:
    | "SORT_BY_PRICE"
    | "FILTER_BY_STOCK"
    | "FILTER_BY_SHIPPING"
    | "FILTER_BY_RATING"
    | "FILTER_BY_SEARCH"
    | "FILTER_BY_CATEGORY"
    | "RESET_FILTERS"
    | "CLEAR_RESET";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialFilerState: FilterState = {
  byPrice: "",
  byStock: [],
  byShipping: [],
  byRating: 0,
  bySearch: "",
  byCategory: "",
  reset: false,
};

const filterReducer = (
  state: FilterState,
  action: FilterActions
): FilterState => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, byPrice: action.payload, reset: false };
    case "FILTER_BY_CATEGORY":
      return { ...state, byCategory: action.payload, reset: false };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload, reset: false };
    case "FILTER_BY_SEARCH":
      return { ...state, bySearch: action.payload, reset: false };
    case "FILTER_BY_SHIPPING":
      return { ...state, byShipping: action.payload, reset: false };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: action.payload, reset: false };
    case "RESET_FILTERS":
      return {
        ...state,
        byPrice: "",
        byStock: [],
        byShipping: [],
        byRating: 0,
        bySearch: "",
        byCategory: "",
        reset: true,
      };
    case "CLEAR_RESET":
      return { ...state, reset: false };
    default:
      return state;
  }
};

// Cart
interface CartState {
  cart: CartProductModel[];
  loading: boolean;
  error: string | null;
}

interface CartActions {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "CHANGE_CART_QTY";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialCartState: CartState = {
  cart: [],
  loading: true,
  error: null,
};

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
            total: action.payload.price,
            discountedTotal: getPriceAfterDiscount(
              action.payload.price,
              action.payload.discountPercentage
            ),
          },
        ],
        loading: false,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item.id === action.payload.id
            ? ((item.quantity = action.payload.quantity),
              (item.total = action.payload.quantity * item.price),
              (item.discountedTotal = getPriceAfterDiscount(
                action.payload.quantity * item.price,
                item.discountPercentage
              )))
            : item.quantity
        ),
      };
    default:
      return state;
  }
};

// Favorite
interface FavoriteState {
  favorites: ProductModel[];
}

interface FavoriteActions {
  type: "ADD_TO_FAV" | "REMOVE_FROM_FAV";
  payload: ProductModel;
}

const initialFavoriteState: FavoriteState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]") || [],
};

const favoriteReducer = (
  state: FavoriteState,
  action: FavoriteActions
): FavoriteState => {
  let updatedFavorites: ProductModel[];

  switch (action.type) {
    case "ADD_TO_FAV": {
      const isAlreadyFavorite = state.favorites.some(
        (item) => item.id === action.payload.id
      );

      if (isAlreadyFavorite) {
        return state; // No changes if item is already a favorite
      }

      updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    case "REMOVE_FROM_FAV": {
      updatedFavorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    default:
      return state;
  }
};

// Create context
const ProductContext = createContext<
  | {
      categoryState: CategoryState;
      categoryDispatch: React.Dispatch<CategoryAction>;
      productState: ProductState;
      productDispatch: React.Dispatch<ProductAction>;
      filterState: FilterState;
      filterDispatch: React.Dispatch<FilterActions>;
      cartState: CartState;
      cartDispatch: React.Dispatch<CartActions>;
      favoriteState: FavoriteState;
      favoriteDispatch: React.Dispatch<FavoriteActions>;
    }
  | undefined
>(undefined);

// Provider Component
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { loadingDispatch } = useLoading();
  const [categoryState, categoryDispatch] = useReducer(
    categoryReducer,
    initialCategoryState
  );
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilerState
  );

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const [favoriteState, favoriteDispatch] = useReducer(
    favoriteReducer,
    initialFavoriteState
  );

  useEffect(() => {
    const fetchAllData = () => {
      loadingDispatch({ type: "SHOW_LOADING" });
      Promise.all([
        axiosApi.get<Category[]>("/categories"),
        axiosApi.get(
          "?limit=194&skip=0&select=shippingInformation,availabilityStatus"
        ),
        axiosApi.get("?limit=194&skip=0"),
      ])
        .then(([data1, data2, data3]) => {
          categoryDispatch({ type: "FETCH_CTG_SUCCESS", payload: data1.data });
          const respData: ShippingStockResponseModel = data2.data;
          const availability: string[] = [];
          const shipping: string[] = [];
          respData.products.forEach((prod) => {
            availability.push(prod.availabilityStatus);
            shipping.push(prod.shippingInformation);
          });
          categoryDispatch({
            type: "FETCH_SHIP_SUCCESS",
            payload: Array.from(new Set(shipping)),
          });
          categoryDispatch({
            type: "FETCH_STOCK_SUCCESS",
            payload: Array.from(new Set(availability)),
          });
          productDispatch({
            type: "FETCH_PROD_SUCCESS",
            payload: data3.data.products,
          });
          loadingDispatch({ type: "HIDE_LOADING" });
        })
        .catch((error) => {
          productDispatch({ type: "FETCH_PROD_FAILURE", payload: error });
          categoryDispatch({ type: "FETCH_CTG_FAILURE", payload: error });
          loadingDispatch({ type: "HIDE_LOADING" });
        });
    };
    fetchAllData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        categoryState,
        categoryDispatch,
        productState,
        productDispatch,
        filterState,
        filterDispatch,
        cartState,
        cartDispatch,
        favoriteState,
        favoriteDispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = (): {
  categoryState: CategoryState;
  categoryDispatch: React.Dispatch<CategoryAction>;
  productState: ProductState;
  productDispatch: React.Dispatch<ProductAction>;
  filterState: FilterState;
  filterDispatch: React.Dispatch<FilterActions>;
  cartState: CartState;
  cartDispatch: React.Dispatch<CartActions>;
  favoriteState: FavoriteState;
  favoriteDispatch: React.Dispatch<FavoriteActions>;
} => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
