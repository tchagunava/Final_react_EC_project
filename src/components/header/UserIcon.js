import { Avatar, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { getUserInitials } from '../../application';
import { useUserInfo } from '../../redux';

export const UserIcon = () => {
    const userData = useUserInfo();
    return (
        <Box>
            <Avatar>{getUserInitials(userData?.firstName, userData?.lastName)}</Avatar>
        </Box>
    );
};
