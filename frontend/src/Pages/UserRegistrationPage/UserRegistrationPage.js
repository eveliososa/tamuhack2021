import * as React from "react";
import "./UserRegistrationPage.css";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export const UserRegistrationPage = () => {
    const [firstName, setFirstName] = React.useState("");
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const [lastName, setLastName] = React.useState("");
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [password, setPassword] = React.useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validForm = firstName && lastName && username && password;

    const handleSubmit = () => {
        const body = {
            firstName,
            lastName,
            username,
            password,
        };
        fetch("http://localhost:5000/api/registerUser", {
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
                window.location.href = `/user/${username}`;
            }
        })
    };

    return(
        <Box className="userRegistrationContainer">
            <Typography className="userRegistrationTitle">User Registration</Typography>
            <Box className="userRegistrationFormContainer">
                <Box className="userRegistrationFormFieldContainer">
                    <TextField className="userRegistrationFormField" id="firstname" required label="First Name" value={firstName} onChange={handleFirstNameChange}  variant="outlined"/>
                </Box>
                <Box className="userRegistrationFormFieldContainer">
                    <TextField className="userRegistrationFormField" id="lastname" required label="Last Name" value={lastName} onChange={handleLastNameChange} variant="outlined"/>
                </Box>
                <Box className="userRegistrationFormFieldContainer">
                    <TextField className="userRegistrationFormField" id="username" required label="Username" value={username} onChange={handleUsernameChange} variant="outlined"/>
                </Box>
                <Box className="userRegistrationFormFieldContainer">
                    <TextField className="userRegistrationFormField" id="password" required label="Password" type="password" value={password} onChange={handlePasswordChange} variant="outlined"/>
                </Box>
                <Button size="large" variant="contained" color="primary" onClick={() => handleSubmit()} disabled={!validForm}>Register</Button>
            </Box>
        </Box>
    );
};
