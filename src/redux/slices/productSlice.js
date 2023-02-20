import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../application";

export const saveProduct = createAsyncThunk(
    "product/saveProduct",
    async ({ product, isUpdating, id }, { rejectWithValue, }) => {
        try {
            const endpoint = isUpdating ? `/products/${id}` : "/products";
            const method = isUpdating ? "put" : "post";

            const { data } = await axiosInstance[method](endpoint, { product });
            return data;
        } catch (error) {
            return rejectWithValue("error during saving product");
        }
    }
);

export const fetchHomePageProducts = createAsyncThunk(
    "product/fetchHomePageProducts",
    async ({ product }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axiosInstance.get("products", { product });
            dispatch(fetchHomePageProducts());
            return data;
        } catch (error) {
            return rejectWithValue("error during fetching homepage")
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        homePageProducts: [],
        error: null,
        selectedProduct: null,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveProduct.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(saveProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchHomePageProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.fetchHomePageProducts = action.payload.products;
            state.error = null;
        });
        builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const productReducer = productSlice.reducer;
export const { setSelectedProduct } = productSlice.actions;