import React from "react";
import { Router} from "@reach/router";
import Box from "@material-ui/core/Box";
import { HomePage } from "./Pages/HomePage/HomePage";
import { UserPage } from "./Pages/UserPage/UserPage";
import { UserRegistrationPage } from "./Pages/UserRegistrationPage/UserRegistrationPage";
import { UserLoginPage } from "./Pages/UserLoginPage/UserLoginPage";
import { OrganizationRegistrationPage } from "./Pages/OrganizationRegistrationPage/OrganizationRegistrationPage";
import { OrganizationLoginPage } from "./Pages/OrganizationLoginPage/OrganizationLoginPage";
import { OrganizationPage } from "./Pages/OrganizationPage/OrganizationPage";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <Router>
        <HomePage path="/" />
        <UserPage path="/user/:id" />
        <UserRegistrationPage path="/userRegistration" />
        <UserLoginPage path="/userLogin" />
        <OrganizationRegistrationPage path="/organizationRegistration" />
        <OrganizationLoginPage path="/organizationLogin" />
        <OrganizationPage path="/organization/:id" />
      </Router>
    </Box>
  );
}

export default App;
