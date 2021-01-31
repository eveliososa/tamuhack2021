import * as React from "react";
import "./UserPage.css"
import { useParams } from "@reach/router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { UserCharityComponent } from "../../Components/UserCharityComponent/UserCharityComponent";
import { UserMainComponent } from "../../Components/UserMainComponent/UserMainComponent";

export const UserPage = () => {
    const { username } = useParams();

    const [userData, setUserData] = React.useState([]);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/user/${username}`, {
            crossDomain: true,
            method: "GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            setUserData(data);
            getOrganizations();
        })
    }, [username]);

    const getOrganizations = () => {
        fetch(`http://127.0.0.1:5000/api/allOrganizations`, {
            crossDomain: true,
            method: "GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            console.log(response)
            if(response.ok){
                return response.json();
            } else{
                return null;
            }
        }).then(data => {
            if(data!==null){
                setData(data);
            }
        });
    };

    const pageOptions = ["Home", "Charities"];

    const [page, setPage] = React.useState(pageOptions[0]);
    const handlePage = (page) => {
        setPage(page);
    }

    return(
        <Box>
            <Box className="navigationContainer">
                {pageOptions.map((pageName) => (
                    <Button variant={page === pageName ? "contained" : "outlined"} color="primary" key={pageName} className="navigationButton" onClick={() => handlePage(pageName)}>{pageName}</Button>
                ))}
            </Box>
            <Box display={page === pageOptions[0] ? "block" : "none"}>
                <UserMainComponent/>
            </Box>
            <Box display={page === pageOptions[1] ? "block" : "none"}>
                <UserCharityComponent/>
            </Box>
        </Box>
    );
};

