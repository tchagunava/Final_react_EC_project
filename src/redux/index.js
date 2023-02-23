import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export { authentificateUser } from "./slices/userSlice";
export { logoutUser } from "./slices/userSlice";
export {
    saveProduct,
    fetchHomePageProducts,
    setSelectedProduct,
    fetchCategoryProducts,
    queryProducts,
    setSearchProducts,
    rateProduct,
} from "./slices/productSlice";

export {
    fetchCart,
    saveCart,
    addToCart,
    removeFromCart,
    clearCart,
} from "./slices/cartSlice";

export const useUserInfo = () => useSelector((state) => state.user.userInfo);

export const useSelectedProduct = () =>
    useSelector((state) => state.product.selectedProduct);

export const useHomePageProducts = () =>
    useSelector((state) => state.product.homePageProducts);
export const useCategories = () =>
    useSelector((state) => state.product.categories);
export const useCart = () => useSelector((state) => state.cart.cartItems);
export const useCategoryProducts = () =>
    useSelector((state) => state.product.categoryProducts);
export const useSearchResults = () =>
    useSelector((state) => state.product.searchResults);