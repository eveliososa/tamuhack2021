import * as React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { OrganizationMainComponent } from "../Components/OrganizationMainComponent/OrganizationMainComponent";

export const OrganizationPage = () => {
    return(
        <Box>
            <Typography>Welcome to GoCharity!</Typography>
            <OrganizationMainComponent/>

        </Box>
    );
};
