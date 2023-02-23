import { Box, styled } from '@mui/material';
import React from 'react'

const StyledHeader = styled(Box)(() => ({
    padding: "0 100px 0px 30px",
    color: "#103866",
    background: "#fff",
    height: "64px",
    display: "flex",
    alignItems: "center",
}));

export const SidebarHeader = () => {
    return <StyledHeader>SomeLogo</StyledHeader>;
};