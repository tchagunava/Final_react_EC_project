import { Box, Button, Drawer, styled, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { clearCart, saveCart, useUserInfo } from "../../redux";

const StyledBox = styled(Box)(() => ({
    width: 400,
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
}));

export const CartDrawer = ({
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartItems,
}) => {
    const userInfo = useUserInfo();
    const dispatch = useDispatch();
    const onSaveCart = (isClear) => {
        dispatch(
            saveCart({ userId: userInfo?._id, cartItems: isClear ? [] : cartItems })
        );
    };
    return (
        <Drawer
            open={isCartDrawerOpen}
            onClose={() => setIsCartDrawerOpen(false)}
            anchor="right"
        >
            {cartItems.map((item) => {
                const { product, quantity } = item;
                const { price, name, _id, image } = product;
                return (
                    <StyledBox key={_id}>
                        <img
                            src={image}
                            alt=""
                            width="100px"
                            height="100px"
                            style={{ objectFit: "cover", borderRadius: 5 }}
                        />
                        <Box sx={{ paddingLeft: 2 }}>
                            <Typography>{name}</Typography>
                            <Typography>Quantity:{quantity}</Typography>
                            <Typography>Total Price:{price * quantity}$</Typography>
                        </Box>
                    </StyledBox>
                );
            })}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    onClick={() => {
                        dispatch(clearCart());
                        setIsCartDrawerOpen(false);
                        onSaveCart(true);
                    }}
                >
                    Clear Cart
                </Button>
                {userInfo && (
                    <Button onClick={() => onSaveCart(false)}>Save Cart</Button>
                )}
            </Box>
        </Drawer>
    );
};
