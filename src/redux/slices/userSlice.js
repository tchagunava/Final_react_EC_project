import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../application";

export const authentificateUser = createAsyncThunk(
    "user/authenticateUser",
    async (values, { rejectWithValue }) => {
        try {
            const route = `/users/${values.isLogin ? "login" : "register"}`;
            const { data } = await axiosInstance.post(route, values.formValues);
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh_token", data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue("error during login");
        }
    }
);

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            userInfo: null,
            loading: false,
            error: null,
        },
        reducers: {
            logoutUser: (state) => {
                state.userInfo = null;
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
            },
        },
        extraReducers: (builder) => {
            builder.addCase(authentificateUser.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(authentificateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.error = null;
            });
            builder.addCase(authentificateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        },

    }
);

export const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;