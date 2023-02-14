import { AppBar, Box, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";

const StyledAppBar = styled(AppBar)(() => ({
    background: "#fff",
    color: "#103B66",
    width: "100%",
    padding: "0 100px 0 30px",
    display: "flex",
    position: "unset",
}));

const StyledToolBar = styled(Toolbar)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
}));

export const Header = () => {
    return (
        <Box>
            <StyledAppBar>
                <StyledToolBar>
                    <Link to="/">Home</Link>
                    <SearchBar />
                    <UserIcon />
                </StyledToolBar>
            </StyledAppBar>
        </Box>
    );
};