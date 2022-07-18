import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const testApi = "http://localhost:8000/api";

function UserHomeScreen() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['voting-app']);
    const [user, setUser] = useState({});
    useEffect(() => {
        (async function () {
            try {
                if (cookies["user-id"] && typeof cookies["user-id"] != 'undefined') {
                    let response = await fetch(testApi + "/user/" + cookies["user-id"], {
                        "method": "GET"
                    });
                    if (response) {
                        let respData = await response.json();
                        // console.log(respData);
                        if (respData.success !== false) {
                            setUser(respData);
                        }
                    }
                } else {
                    navigate("/sign-in");
                }

            } catch (error) {
                console.log(error);
            }

        })()
    }, []);

    return (<>
        <h1>Hello! Welcome {user.name ? user.name : 'User'}</h1>
        <Button href="/create-poll">Create a Poll</Button>
        <Stack gap={3} className="mt-4">
            {user.polls && user.polls.map(pollId=>{
                return <div className="bg-light border" onClick={()=>navigate("/cast-vote", {state: {id: pollId}})}>{pollId}</div>
            })}   
        </Stack>
    </>)
}

export default UserHomeScreen;