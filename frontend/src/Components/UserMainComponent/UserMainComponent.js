import * as React from "react";
import "./UserMainComponent.css"
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar'

export const UserMainComponent = ({
    userData, data, userOrgData,
}) => {
    return(
        <Box className="userPageContainer">  
            <Typography className="userPageTitle">Welcome {userData["first_name"]} {userData["last_name"]}!</Typography>
            <Avatar className="userPageAvatar">{userData["first_name"][0]}</Avatar>
            <Box display={userOrgData['subscriptions'] === undefined ? "none": "block"}>
                <Box>
                    <Typography>{userOrgData['subscriptions']}</Typography>
                    {Object.keys(data).map((id) => (
                        <Box key={id}>
                            {data[id]['charity_name'] === userOrgData['subscriptions'] ? <Typography>{data[id]['description']}</Typography>:null}
                        </Box>
                    ))}
                    <Typography>Total amount donated ${userData["current_total"]}</Typography>
                </Box>
            </Box>
            <Box display={userOrgData['subscriptions'] === undefined ? "block": "none"}>
                <Typography>You have no organizations selected.</Typography>
            </Box>
        </Box>
      
    );
}

   