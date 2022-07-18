import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useLocation } from "react-router-dom";

const choices = [{
    "_id": 1,
    "title": "Choice 1",
    "description": "No description"
}, {
    "_id": 2,
    "title": "Choice 2",
    "description": "No description"
}, {
    "_id": 3,
    "title": "Choice 3",
    "description": "No description"
}, {
    "_id": 4,
    "title": "Choice 4",
    "description": "No description"
}]; // params.choices;
// let multipleAllowed = true; // params.multipleAllowed;
const testApi = "http://localhost:8000/api";
function VotingCard(params) {
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['voting-app']);
    const [pollData, setPollData] = useState({});
    useEffect(() => {
        (async function () {
            try {
                if (location.state.id && typeof location.state.id != 'undefined') {
                    let response = await fetch(testApi + "/poll/" + location.state.id, {
                        "method": "GET"
                    });
                    if (response) {
                        let respData = await response.json();
                        // console.log(respData);
                        if (respData.success !== false) {
                            setPollData(respData);
                        }
                    }
                } else {
                    // navigate("/user");
                }

            } catch (error) {
                console.log(error);
            }

        })()
    }, []);

    const [choice, setChoice] = useState();
    const setSelected = (id)=>{
        console.log(id);
        setChoice(id);
    }
    const castAVote = async ()=>{
        await fetch(testApi + "/cast-vote/", {
            "method": "POST",
            "headers": {
                "Content-type": "application/json"
            },
            "body": JSON.stringify({
                "pollId": location.state.id,
                "userId": cookies["user-id"],
                "choiceId": choice
            })
        });
    }

    /* 
    let response = await 
    */

    return (
        <Card className="text-center" style={{ padding: "15px" }}> {/* left:"50%", transform: "translate(-50%,50%)",  */}
            <Card.Header>
                <Card.Title as={'h2'}>{pollData.title || "Title"}</Card.Title>
                <Card.Text>{pollData.title || "Description"}</Card.Text>
            </Card.Header>
            <Card.Body>
                {pollData.choices ?
                    <Container>
                        <Row md={pollData.choices.length > 4 ? 3 : 2}>
                            {pollData.choices.map(choice => {
                                return (
                                    <Col key={choice._id} id={'choice_' + choice._id}>
                                        <Form.Check type='radio' name="choices" onClick={setSelected.bind(null, choice._id)}/> {/* {multipleAllowed ? 'checkbox' : 'radio'} */}
                                        <h3>{choice.title}</h3>
                                        <label>{choice.description}</label>
                                        {/* {choice.description ? <label>{choice.description}</label> : ''} */}
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container> : ''}
                <Button style={{ marginTop: "20px" }} variant="outline-success" size="lg" onClick={castAVote}>Submit</Button>
            </Card.Body>
        </Card>
    );
}

export default VotingCard;