import * as React from "react";
import "./OrganizationRegistrationPage.css";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export const OrganizationRegistrationPage = () => {
    const [organizationName, setOrganizationName] = React.useState("");
    const handleOrganizationNameChange = (e) => {
        setOrganizationName(e.target.value);
    }

    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [password, setPassword] = React.useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validForm = organizationName && username && password;

    const handleSubmit = () => {
        const body = {
            organizationName,
            username,
            password,
        };
        fetch("http://localhost:5000/api/registerOrganization", {
            crossDomain: true,
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            if(data["status"] === true) {
                window.location.href = `/organization/${username}`;
            }
        })
    };

    return(
        <Box className="organizationRegistrationContainer">
            <Typography className="organizationRegistrationTitle">Organization Registration</Typography>
            <Box className="organizationRegistrationFormContainer">
                <Box className="organizationRegistrationFormFieldContainer">
                    <TextField className="organizationRegistrationFormField" id="organizationname" required label="Organization Name" value={organizationName} onChange={handleOrganizationNameChange}  variant="outlined"/>
                </Box>
                <Box className="organizationRegistrationFormFieldContainer">
                    <TextField className="organizationRegistrationFormField" id="username" required label="Username" value={username} onChange={handleUsernameChange} variant="outlined"/>
                </Box>
                <Box className="organizationRegistrationFormFieldContainer">
                    <TextField className="organizationRegistrationFormField" id="password" required label="Password" type="password" value={password} onChange={handlePasswordChange} variant="outlined"/>
                </Box>
                <Button size="large" variant="contained" color="primary" onClick={() => handleSubmit()} disabled={!validForm}>Register</Button>
            </Box>
        </Box>
    );
};
