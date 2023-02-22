import {
    Box,
    Button,
    Card,
    CardActions,
    Grid,
    Rating,
    styled,
    Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../application";
import {
    addToCart,
    removeFromCart,
    setSelectedProduct,
    useCart,
    useUserInfo,
} from "../../redux";

const StyledCardContent = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0 2px",
}));

const StyledBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
}));

export const ProductCard = ({
    name,
    _id,
    image,
    price,
    description,
    category,
    brand,
    averageRating,
    product,
}) => {
    const userInfo = useUserInfo();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useCart();
    const isProductInCart = cartItems?.find((item) => item.product._id === _id);
    const onEdit = () => {
        dispatch(setSelectedProduct(product));
        navigate(`/products/edit/${name}`);
    };

    const onAddtoCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <Grid item>
            <Card sx={{ width: 350, borderRadius: 3 }}>
                <Link to={`/singleproductpage`} style={{ textDecoration: "none" }}>
                    <img
                        src={image}
                        alt={`${category}-${name}`}
                        width="100%"
                        height="200px"
                        style={{ objectFit: "contain" }}
                    />
                    <StyledCardContent>
                        <Typography>{name}</Typography>
                        <Typography>{price}$ </Typography>
                    </StyledCardContent>
                </Link>
                <CardActions>
                    <Rating value={averageRating} />
                    <StyledBox>
                        {isProductInCart ? (
                            <>
                                <Button onClick={() => dispatch(removeFromCart(_id))}>-</Button>
                                <Typography>{isProductInCart.quantity}</Typography>
                                <Button onClick={onAddtoCart}>+</Button>
                            </>
                        ) : (
                            <Button onClick={onAddtoCart}>Add to card</Button>
                        )}

                        {isUserAdmin(userInfo) && <Button onClick={onEdit}>Edit</Button>}
                    </StyledBox>
                </CardActions>
            </Card>
        </Grid>
    );
};
