import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../redux';

export const HomePage = () => {
    const products = useSelector((state) => state.product.homePageProducts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div>
            {products.map((product) => {
                return (
                    <Box>
                        <Link>{product.name}</Link>
                        <Button
                            onClick={() => {
                                dispatch(setSelectedProduct(product));
                                navigate(`/products/edit/${product.name}`);
                            }}
                        >
                            edit
                        </Button>
                    </Box>
                );
            })}
        </div>
    );
};
