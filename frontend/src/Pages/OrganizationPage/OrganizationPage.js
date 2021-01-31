import * as React from "react";
import { useParams } from "@reach/router";
import Box from "@material-ui/core/Box";
import { OrganizationMainComponent } from "../../Components/OrganizationMainComponent/OrganizationMainComponent";
import { NavigationComponent } from "../../Components/NavigationComponent/NavigationComponent";

export const OrganizationPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [validData, setValidData] = React.useState(false);
    const { username } = useParams();

    const [organizationData, setOrganizationData] = React.useState({});

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/organization/${username}`, {
            crossDomain: true,
            method: "GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
            } else{
                return null;
            }
        }).then(data => {
            if(data!==null){
                setValidData(true);
                setOrganizationData(data);
            } else{
                setValidData(false);
            }
        }).finally(() => setLoading(false));
    }, [username]);

    if(loading){
        return(
            <Box></Box>
        );
    };

    return(
        <Box>
            <NavigationComponent/>
            {validData ? <OrganizationMainComponent organizationData={organizationData} username={username}/> : null}
        </Box>
    );
};
