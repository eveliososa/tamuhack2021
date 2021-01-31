import * as React from "react";
import "./UserMainComponent.css"
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar'

export const UserMainComponent = () => {
    const [data, setData] = React.useState({
        "userName" : "James",
        "userAvatar": "dog.PNG",
        "organizations" : { 
            "1" : {
                "name": "Organization 1",
                "amountDonated": "3,000",
                "goalPercentage": 22
                
            },
            "2" : {
                "name": "Organization 1",
                "amountDonated": "3,000",
                "goalPercentage": 40
                
            },
            "3" : {
                "name": "Organization 1",
                "amountDonated": "3,000",
                "goalPercentage": 80
                
            }
        }
    })
   

    return(

        <Box>  
                    <Typography>Welcome {data["userName"]} to goCharity</Typography>
                   
                    <Avatar alt="userAvatar" src={data["userAvatar"]} />
            <Box>
                <Box className="LinearContainer">
                    <LinearProgress  variant="determinate" value={data["organizations"]["1"]["goalPercentage"]} />
                </Box>
                    <Typography>{data["organizations"]["1"]["goalPercentage"]}%</Typography>
                    <Typography>Total $ {data["organizations"]["1"]["amountDonated"]}</Typography>
                    <Typography>{data["organizations"]["1"]["name"]}</Typography>
            </Box>
            <Box>
                <Box className="LinearContainer">
                    <LinearProgress  variant="determinate" value={data["organizations"]["2"]["goalPercentage"]} />
                </Box>
                    <Typography>{data["organizations"]["2"]["goalPercentage"]}%</Typography>
                    <Typography>Total $ {data["organizations"]["2"]["amountDonated"]}</Typography>
                    <Typography>{data["organizations"]["2"]["name"]}</Typography>
            </Box>
            <Box>
                <Box className="LinearContainer">
                    <LinearProgress  variant="determinate" value={data["organizations"]["3"]["goalPercentage"]} />
                </Box>
                    <Typography>{data["organizations"]["3"]["goalPercentage"]}%</Typography>
                    <Typography>Total $ {data["organizations"]["3"]["amountDonated"]}</Typography>
                    <Typography>{data["organizations"]["3"]["name"]}</Typography>
            </Box>
                

        </Box>
      
    );}

   