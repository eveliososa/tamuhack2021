import * as React from "react";
import "./UserCharityComponent.css"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export const UserCharityComponent = ({
    data, userOrgData, username,
}) => {

    const handleCharitySelection = (charity_name, status) => {
        fetch(`http://127.0.0.1:5000//api/addChar/${username}/${charity_name}`, {
            crossDomain: true,
            method: "GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            console.log(data);
        })
    };

    const [charityOptions, setCharityOptions] = React.useState([]);
    const handleCharityOptions = (data) => {
        setCharityOptions(
            <Box className="charityPageContainer">
                {Object.keys(data).map((id) => (
                    <Box boxShadow={3} className="charityContainer" key={id}>
                        <Box className="charityInfoContainer">
                            <Typography className="charityName">{data[id]["charity_name"]}</Typography>
                            <Typography className="charityAmount">Total donations: ${data[id]["total_received"]}</Typography>
                            <Typography className="charityDescription">{data[id]["description"]}</Typography>
                            <Box boxShadow={2} className="charitySubscribersContainer">
                                <Typography className="charitySubscribers">{data[id]["subcriptions"]}</Typography>
                            </Box>
                        </Box>
                        {userOrgData['subscriptions'] === undefined ? <Box className="charitySelectionContainer">
                            <IconButton onClick={() => handleCharitySelection(data[id]["charity_name"], true)}>
                                <AddCircleIcon className="addIcon"></AddCircleIcon>
                            </IconButton>
                        </Box> : <Box className="charitySelectionContainer">
                            <IconButton onClick={() => handleCharitySelection(data[id]["charity_name"], !(data[id]["charity_name"] in userOrgData['subscriptions']))}>
                                {data[id]["charity_name"] in userOrgData['subscriptions'] ?  <CancelIcon className="removeIcon"></CancelIcon> : <AddCircleIcon className="addIcon"></AddCircleIcon>}
                            </IconButton>
                        </Box>
                        }
                    </Box>
                ))}
            </Box>
        );
    };

    React.useEffect(() => {
        handleCharityOptions(data);
    }, [data]);

    return(
        <Box>
            {charityOptions}
        </Box>
    );
};
