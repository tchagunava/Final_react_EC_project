import { Avatar, Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInitials, isUserAdmin } from '../../application';
import { logoutUser, useUserInfo } from '../../redux';

export const UserIcon = () => {
    const userData = useUserInfo();
    const [anchor, setAnchor] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Box>
            <IconButton onClick={(e) => {
                setAnchor(e.currentTarget);
            }}>
                <Avatar>
                    {getUserInitials(userData?.firstName, userData?.lastName)}
                </Avatar>
            </IconButton>
            <Box>
                <Menu
                    anchorEl={anchor}
                    anchorOrigin={{
                        vertical: "buttom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                >
                    {!!userData ? (
                        <MenuItem onClick={() => {
                            dispatch(logoutUser());
                            navigate("/");
                        }}
                        >
                            <Button>Logout</Button>
                        </MenuItem>
                    ) : (
                        <Box>
                            <MenuItem onClick={() => navigate("/login")}>
                                <Button>login</Button>
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/register")}>
                                <Button>Registration</Button>
                            </MenuItem>
                        </Box>
                    )}
                    {isUserAdmin(userData) && (
                        <MenuItem onClick={() => navigate("/products/new")}>
                            <Button>add product</Button>
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </Box>
    );
};
