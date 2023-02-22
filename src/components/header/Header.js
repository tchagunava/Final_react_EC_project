import styled from "@emotion/styled";
import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { BsCart } from "react-icons/bs";
import { useCart } from "../../redux";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";

const StyledAppBar = styled(AppBar)(() => ({
    background: "#fff",
    color: "#103866",
    width: "100%",
    padding: "0 100px 0px 30px",
    display: "flex",
}));

const StyledToolBar = styled(Toolbar)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
}));

const StyledBadge = styled(Badge)(() => ({
    "&.MuiBadge-badge": {
        width: "20px",
        height: "21px",
        color: "#fff",
        background: "#F33451",
        top: "2px",
        right: "-3px",
    },
}));

export const Header = () => {
    const cartItems = useCart();
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const cartItemsQuantity = cartItems?.reduce(
        (acc, curr) => acc + curr.quantity,
        0
    );
    return (
        <Box>
            <StyledAppBar>
                <StyledToolBar>
                    <Link to="/">Home</Link>
                    <SearchBar />
                    <UserIcon />
                    <Button onClick={() => setIsCartDrawerOpen(true)}>
                        <StyledBadge badgeContent={cartItemsQuantity}>
                            <BsCart size={30} />
                        </StyledBadge>
                    </Button>
                    <CartDrawer
                        cartItems={cartItems}
                        isCartDrawerOpen={isCartDrawerOpen}
                        setIsCartDrawerOpen={setIsCartDrawerOpen}
                    />
                </StyledToolBar>
            </StyledAppBar>
        </Box>
    );
};
