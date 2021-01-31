import * as React from "react";
import "./OrganizationMainComponent.css"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const OrganizationMainComponent = ({
    organizationData, username
}) => {
    const [disableAddDescription, setDisabledAddDescription] = React.useState(organizationData['description']!=="");
    const [disableEditDescription, setDisabledEditDescription] = React.useState(organizationData['description']==="");
    const [updatingDescription, setUpdatingDescription] = React.useState(false);
    const [description, setDescription] = React.useState(organizationData['description']);
    const [newDescription, setNewDescription] = React.useState(organizationData['description']);

    const handleAddDescription = () => {
        setUpdatingDescription(true);
        setDisabledAddDescription(true);
    }

    const handleEditDescription = () => {
        setUpdatingDescription(true);
        setDisabledEditDescription(true);
    }

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    }

    const handleSubmit = () => {
        setDisabledAddDescription(true);
        setDisabledEditDescription(false);

        const body = {
            newDescription,
        };
        fetch(`http://localhost:5000/api/organization//updateMessage/${username}`, {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            if(data['status'] === true) {
                setDescription(newDescription);
                setUpdatingDescription(false);
            }
        })
    }

    const handleCancel = () => {
        setNewDescription(description);
        setDisabledAddDescription(description!=="");
        setDisabledEditDescription(description==="");
        setUpdatingDescription(false);
    }

    console.log(updatingDescription)
    console.log(disableEditDescription)
    console.log(disableAddDescription)
    return(
        <Box className="organizationPageContainer">
            <Typography className="organizationPageTitle">Welcome {organizationData['name']}!</Typography>
            <Avatar className="organizationPageAvatar">{organizationData['name'][0]}</Avatar>
            <Box className="organizationPageDataContainer">
                <Box className="organizationPageIndividualDataContainer" boxShadow={2}>
                    <Typography className="organizationPageIndividualData">{organizationData['subscribers']}</Typography>
                    <Typography className="organizationPageIndividualDataTitle">Subscribers</Typography>
                </Box>
                <Box className="organizationPageIndividualDataContainer" boxShadow={2}>
                    <Typography className="organizationPageIndividualData">${organizationData['totalReceived']}</Typography>
                    <Typography className="organizationPageIndividualDataTitle">Total Amount Donated</Typography>
                </Box>
                <Box className="organizationPageIndividualDataContainer" boxShadow={2}>
                    <Typography className="organizationPageIndividualData">${organizationData['currentBalance']}</Typography>
                    <Typography className="organizationPageIndividualDataTitle">Current Balance</Typography>
                </Box>
            </Box>
            <Box className="organizationPageDescriptionContainer">
                <Typography className="organizationPageDescriptionEditTitle">Organization's Description:</Typography>
                <Box className="organizationPageDescriptionAddContainer" display={!disableAddDescription && !updatingDescription ? "block" : "none"}>
                <Typography className="organizationPageDescription">You have not set a description for your organization yet. Click the button below to add one.</Typography>
                    <Button size="large" variant="contained" color="primary" onClick={() => handleAddDescription()}>Add Description</Button>
                </Box>
                <Box className="organizationPageDescriptionEditContainer" display={!disableEditDescription && !updatingDescription ? "block" : "none"}>
                    <Typography className="organizationPageDescription">{description}</Typography>
                    <Button size="large" variant="contained" color="primary" onClick={() => handleEditDescription()}>Edit Description</Button>
                </Box>
                <Box display={updatingDescription ? "block" : "none"}>
                    <TextField className="organizationPageFormField" id="description" required label="Description" value={newDescription} onChange={handleDescriptionChange} variant="outlined" multiline rows={3}/>
                    <Box>
                        <Button className="organizationPageDescriptionCancelButton" size="large" variant="contained"  onClick={() => handleCancel()}>Cancel</Button>
                        <Button className="organizationPageDescriptionUpdateButton" size="large" variant="contained"  onClick={() => handleSubmit()}>{!setDisabledAddDescription ? "Add" : "Update"}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
