import * as React from "react";
import "./NavigationComponent.css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const NavigationComponent = () => {
    return(
        <Box className="generalContainer">
            <Box boxShadow={3} className="generalNavigationContainer">
                <Box className="generalTitleContainer">
                    <Typography className="generalTitle">GoCharity</Typography>
                </Box>
            </Box>
        </Box>
    );
};
