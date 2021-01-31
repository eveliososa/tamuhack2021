import * as React from "react";
import "./UserLoginPage.css";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export const UserLoginPage = () => {
    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [password, setPassword] = React.useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        console.log("Loging in user!");
    }

    return(
        <Box className="userLoginContainer">
            <Typography className="userLoginTitle">User Login</Typography>
            <Box className="userLoginFormContainer">
                <Box className="userLoginFormFieldContainer">
                    <TextField className="userLoginFormField" id="username" required label="Username" value={username} onChange={handleUsernameChange} variant="outlined"/>
                </Box>
                <Box className="userLoginFormFieldContainer">
                    <TextField className="userLoginFormField" id="password" required label="Password" type="password" value={password} onChange={handlePasswordChange} variant="outlined"/>
                </Box>
                <Button size="large" variant="contained" color="primary" onClick={() => handleSubmit()}>Login</Button>
            </Box>
        </Box>
    );
};
