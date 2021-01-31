import * as React from "react";
import { useParams } from "@reach/router";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { OrganizationMainComponent } from "../../Components/OrganizationMainComponent/OrganizationMainComponent";

export const OrganizationPage = () => {
    const { id } = useParams();

    const [organizationData, setOrganizationData] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/organization/${id}`, {
            crossDomain: true,
            method: "GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            setOrganizationData(data);
        })
    }, [id]);

    return(
        <Box>
            <Typography>Welcome to GoCharity!</Typography>
            <OrganizationMainComponent organizationData={organizationData}/>
        </Box>
    );
};
