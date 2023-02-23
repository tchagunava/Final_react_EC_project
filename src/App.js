import "./App.css";
import React, { useEffect } from "react";
import { RoutesComponent } from "./Routes";
import { Header } from "./components/header";
import { Box, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchHomePageProducts, useUserInfo } from "./redux";
import { fetchCart } from "./redux/slices/cartSlice";
import { Sidebar } from "./components/sidebar";

const StyledContentContainer = styled(Box)(() => ({
    padding: "0 0 0 37px",
    width: "calc(100% - 255px)",
    marginLeft: "255px",
    marginTop: "100px",
    minHeight: "100vh",
}));

const App = () => {
    const dispatch = useDispatch();
    const userInfo = useUserInfo();
    useEffect(() => {
        dispatch(fetchHomePageProducts());
    }, []);
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchCart(userInfo._id));
        }
    });
    return (
        <Box>
            <Sidebar />
            <Header />
            <StyledContentContainer sx={{ marginTop: 10 }}> {RoutesComponent()}</StyledContentContainer>
        </Box>
    );
};

export default App;
