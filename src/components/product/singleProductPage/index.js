import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct, useSingleProduct } from "../../../redux";

const styles = {
    mainStyle: {
        display: "flex",

    },
    photoStyle: {
        borderRadius: "10px",
        width: "400px",
    },
};
export const SingleProduct = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { categoryName } = useParams();
    const singleProduct = useSingleProduct();
    useEffect(() => {
        dispatch(fetchSingleProduct({ id: state.id, category: categoryName }));
    }, [state.id]);
    return (
        <div style={styles.mainStyle}>
            <Box>..
                <Typography>
                    <img src={singleProduct?.image} style={styles.photoStyle} />
                </Typography>
            </Box>
            <Box marginLeft={"30px"}>
                <Typography paddingTop="10px" fontSize={"24px"}>Product Name:{singleProduct?.name}</Typography>
                <Typography paddingTop="10px" fontSize={"24px"}>Brand:{singleProduct?.brand}</Typography>
                <Typography paddingTop="10px" fontSize={"24px"}>About Product:{singleProduct?.description}</Typography>
            </Box>
        </div>
    );
};

export default SingleProduct;