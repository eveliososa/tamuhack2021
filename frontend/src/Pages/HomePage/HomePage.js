import * as React from "react";
import "./HomePage.css";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const HomePage = () => {
    const [organizationAnchorEl, setOrganizationAnchorEl] = React.useState(null);
    const [userAnchorEl, setUserAnchorEl] = React.useState(null);

    const handleOrganizationClick = (event) => {
        setOrganizationAnchorEl(event.currentTarget);
    };

    const handleOrganizationClose = () => {
        setOrganizationAnchorEl(null);
    };

    const handleOrganization = (page) => {
        window.location.href = `/organization${page}`;
    };

    const handleUserClick = (event) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setUserAnchorEl(null);
    };

    const handleUser = (page) => {
        window.location.href = `/user${page}`;
    };

    return(
        <Box className="homePageContainer">
            <Box boxShadow={3} className="homePageNavigationContainer">
                <Box className="homePageTitleContainer">
                    <Typography className="homePageTitle">GoCharity</Typography>
                </Box>
                <Box className="homePageButtonContainer">
                    <Button className="homePageButton" aria-controls="user-menu" aria-haspopup="true" onClick={handleUserClick}>User</Button>
                    <Menu
                        id="user-menu"
                        anchorEl={userAnchorEl}
                        keepMounted
                        open={Boolean(userAnchorEl)}
                        onClose={handleUserClose}
                    >
                        <MenuItem onClick={() => handleUser("Login")}>Login</MenuItem>
                        <MenuItem onClick={() => handleUser("Registration")}>Register</MenuItem>
                    </Menu>
                    <Button className="homePageButton" aria-controls="organization-menu" aria-haspopup="true" onClick={handleOrganizationClick}>Organization</Button>
                    <Menu
                        id="organization-menu"
                        anchorEl={organizationAnchorEl}
                        keepMounted
                        open={Boolean(organizationAnchorEl)}
                        onClose={handleOrganizationClose}
                    >
                        <MenuItem onClick={() => handleOrganization("Login")}>Login</MenuItem>
                        <MenuItem onClick={() => handleOrganization("Registration")}>Register</MenuItem>
                    </Menu>
                </Box>
            </Box>

        </Box>
    );
};
