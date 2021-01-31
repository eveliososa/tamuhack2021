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

    const handleSubmit = () => {
        console.log("Registering user!");
    }

    return(
        <Box className="userRegistrationContainer">
            <Typography className="title">User Registration</Typography>
            <Box className="formContainer">
                <Box className="formFieldContainer">
                    <TextField className="formField" id="firstname" required label="First Name" value={firstName} onChange={handleFirstNameChange}  variant="outlined"/>
                </Box>
                <Box className="formFieldContainer">
                    <TextField className="formField" id="lastname" required label="Last Name" value={lastName} onChange={handleLastNameChange} variant="outlined"/>
                </Box>
                <Box className="formFieldContainer">
                    <TextField className="formField" id="username" required label="Username" value={username} onChange={handleUsernameChange} variant="outlined"/>
                </Box>
                <Box className="formFieldContainer">
                    <TextField className="formField" id="password" required label="Password" type="password" value={password} onChange={handlePasswordChange} variant="outlined"/>
                </Box>
                <Button size="large" variant="contained" color="primary" onClick={() => handleSubmit()}>Register</Button>
            </Box>
        </Box>
    );
};
