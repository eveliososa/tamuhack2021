import * as React from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar'

export const OrganizationMainComponent = () => {
    const [data] = React.useState({
        "userAvatar" : "",
        "1": {
            "totalReceived" : "5000",
            "name" : "organization 1",
            "subscribers" : "100"



        }
    })
    return(
        <Box>
            <Typography>Welcome {data["1"]["name"]}</Typography>
            <Avatar alt="userAvatar" src={data["userAvatar"]} />
                <Typography> Total Received {data["1"]["totalReceived"]}</Typography>
                <Typography> Subscribers {data["1"]["subscribers"]}</Typography>
            

        </Box>
    )

}