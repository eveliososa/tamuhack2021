import * as React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { UserCharityComponent } from "../Components/UserCharityComponent/UserCharityComponent";

export const UserPage = () => {
    return(
        <Box>
            <Typography>Hello, User!</Typography>
            <UserCharityComponent/>
        </Box>
    );
};

