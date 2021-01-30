import React from "react";
import { Router} from "@reach/router";
import Box from "@material-ui/core/Box";
import { UserPage } from "./Pages/UserPage";
import { OrganizationPage } from "./Pages/OrganizationPage";
import './App.css';

function App() {
  return (
    <Box className="App">
      <Router>
        <UserPage path="/user" />
        <OrganizationPage path="/organization" />
      </Router>
    </Box>
  );
}

export default App;
