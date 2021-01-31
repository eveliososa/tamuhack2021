import * as React from "react";
import "./UserCharityComponent.css"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export const UserCharityComponent = () => {
    const [data, setData] = React.useState({
        "1" : {
            "name": "Organization 1",
            "amount": "3,000",
            "subscribers": "12",
            "subscribed": false,
            "description": "We do the following."
        },
        "2" : {
            "name": "Organization 2",
            "amount": "1,233,423",
            "subscribers": "122",
            "subscribed": true,
            "description": "We do the following."
        },
        "3" : {
            "name": "Organization 3",
            "amount": "1,231,231",
            "subscribers": "142",
            "subscribed": false,
            "description": "We do the following."
        }
    });

    const handleCharitySelection = (id, status) => {
        console.log(data[id]["subscribed"])
        console.log(status)
        var temp_data = data;
        temp_data[id]["subscribed"] = status;
        console.log(temp_data);
        setData(temp_data);
        handleCharityOptions(temp_data);
    };

    const [charityOptions, setCharityOptions] = React.useState([]);
    const handleCharityOptions = (data) => {
        setCharityOptions(
            <Box className="charityPageContainer">
                {Object.keys(data).map((id) => (
                    <Box boxShadow={3} className="charityContainer" key={id}>
                        <Box className="charityInfoContainer">
                            <Typography className="charityName">{data[id]["name"]}</Typography>
                            <Typography className="charityAmount">Total donations: ${data[id]["amount"]}</Typography>
                            <Typography className="charityDescription">{data[id]["description"]}</Typography>
                            <Box boxShadow={2} className="charitySubscribersContainer">
                                <Typography className="charitySubscribers">{data[id]["subscribers"]}</Typography>
                            </Box>
                        </Box>
                        <Box className="charitySelectionContainer">
                            <IconButton onClick={() => handleCharitySelection(id, !data[id]["subscribed"])}>
                                {data[id]["subscribed"] ?  <CancelIcon className="removeIcon"></CancelIcon> : <AddCircleIcon className="addIcon"></AddCircleIcon>}
                            </IconButton>
                        </Box>
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
            <Typography>User Charity Component</Typography>
            {charityOptions}
        </Box>
    );
};
