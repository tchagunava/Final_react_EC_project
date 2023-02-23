import { Box, Divider, Drawer, List, ListItem, ListItemText, styled } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { useCategories } from '../../redux'
import { SidebarHeader } from './SidebarHeader';

const StyledListItem = styled(ListItem)(() => ({
    padding: "5px 0px 3px 15px",
    margin: "0px",
}));

export const Sidebar = () => {
    const sidebarItems = useCategories();
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "block" },
                "& .MuiDrawer-paper": {
                    width: "255px",
                    height: "95%",
                },
            }}
            open
        >
            <SidebarHeader />
            <Divider />
            <List>
                {sidebarItems.map((item) => {
                    const { _id, name } = item;
                    return (
                        <React.Fragment key={_id}>
                            <Link to={`/products/categories/${name}`}>
                                <Box sx={{ display: "flex" }}>
                                    <StyledListItem>
                                        <ListItemText secondary={name} />
                                    </StyledListItem>
                                </Box>
                                <Divider />
                            </Link>
                        </React.Fragment>
                    );
                })}
            </List>
        </Drawer>
    );
};
