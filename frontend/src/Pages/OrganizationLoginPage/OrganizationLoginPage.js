import * as React from "react";
import "./OrganizationLoginPage.css";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export const OrganizationLoginPage = () => {
    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [password, setPassword] = React.useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validForm = username && password;

    const handleSubmit = () => {
        const body = {
            username,
            password,
        };
        fetch("http://localhost:5000/api/loginOrganization", {
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
        <Box className="organizationLoginContainer">
            <Typography className="organizationLoginTitle">Organization Login</Typography>
            <Box className="organizationLoginFormContainer">
                <Box className="organizationLoginFormFieldContainer">
                    <TextField className="organizationLoginFormField" id="username" required label="Username" value={username} onChange={handleUsernameChange} variant="outlined"/>
                </Box>
                <Box className="organizationLoginFormFieldContainer">
                    <TextField className="organizationLoginFormField" id="password" required label="Password" type="password" value={password} onChange={handlePasswordChange} variant="outlined"/>
                </Box>
                <Button size="large" variant="contained" color="primary" onClick={() => handleSubmit()} disabled={!validForm}>Login</Button>
            </Box>
        </Box>
    );
};
