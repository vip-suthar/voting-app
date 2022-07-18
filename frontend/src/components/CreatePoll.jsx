import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Card, FloatingLabel, Row, Col, Button, Container } from "react-bootstrap";
import { useCookies } from 'react-cookie';

const testApi = "http://localhost:8000/api";

// const Poll = {
//     "title": "Sample poll",
//     "description": "this is just to test",
//     "choices": [{
//         "_id": 1,
//         "title": "Choice 1",
//         "description": "No description"
//     }, {
//         "_id": 2,
//         "title": "Choice 1",
//         "description": "No description"
//     }],
//     "admin": "62868bbe93f6776fe5ff2cba",
//     "votes": []
// }

function ChoiceInput(props) {
    const canRemoved = props.canRemoved;
    const choiceNo = props.choiceNo;
    return (<Container>
        <Form.Label style={{ textAlign: "left" }}>
            Choice {choiceNo}
            {canRemoved ? <Button style={{ float: "right" }} variant="danger" onClick={props.removeHandler.bind(this, choiceNo - 1)}>X</Button> : ''}
        </Form.Label>

        <Row>
            <Col md={4}>
                <FloatingLabel
                    controlId="floatingPass"
                    label="Title"
                    className="mb-3"
                >
                    <Form.Control id={`choices-${choiceNo - 1}-title`} type="text" placeholder="Choice Title" onChange={props.updateHandler} />
                </FloatingLabel>
            </Col>
            <Col md={8}>
                <FloatingLabel
                    controlId="floatingPass"
                    label="Description"
                    className="mb-3"
                >
                    <Form.Control id={`choices-${choiceNo - 1}-description`} type="text" placeholder="Choice Description" onChange={props.updateHandler} />
                </FloatingLabel>
            </Col>
        </Row>
    </Container>)
}

function CreatePoll() {
    const navigate = useNavigate();
    const navigateHome = () => navigate('/user');

    const [cookies, setCookie] = useCookies(['voting-app']);

    if (!cookies["user-id"] || typeof cookies["user-id"] == 'undefined') {
        navigate("/sign-in");
    }


    const [pollData, setPollData] = useState({
        "title": null,
        "description": null,
        "choices": [{
            "_id": 0,
            "title": "",
            "description": ""
        }],
        "admin": cookies["user-id"],
        "votes": []
    });
    const updatePollData = function (e) {
        setPollData(oldData => {
            let id = e.target.id;
            if (id.indexOf("-") > -1) {
                id = id.split("-");
                oldData[id[0]][id[1]][id[2]] = e.target.value;
            } else {
                oldData[id] = e.target.value;
            }
            return { ...oldData };
        })
    }

    const [choices, setChoices] = useState([<ChoiceInput key={0} choiceNo={1} canRemoved={false} updateHandler={updatePollData} />]);
    const removeChoice = function (i) {
        console.log("i'm called", i);
        setChoices(choice => {
            choice.splice(i, 1);
            return [...choice];
        });
    }
    const addNewChoice = function () {
        setChoices(choice => {
            setPollData(oldData => {
                return {
                    ...oldData, "choices": [...(oldData.choices), {
                        "_id": choice.length,
                        "title": "",
                        "description": ""
                    }]
                };
            });
            return [...choice, <ChoiceInput key={choice.length} choiceNo={choice.length + 1} canRemoved={true} removeHandler={removeChoice} updateHandler={updatePollData} />];
        });
    }

    const sendPollCreateReq = async function () {
        // console.log(pollData, cookies);

        let response = await fetch(testApi + "/poll/", {
            "method": "POST",
            "headers": {
                "Content-type": "application/json"
            },
            "body": JSON.stringify(pollData)
        });

        if (response) {
            let respData = await response.json();
            // console.log(respData);
            if (respData.success !== false) {
                navigate("/user");
            } else {

            }
        }
    }


    return (
        <Card className="text-center" style={{ left: "50%", width: "35rem", transform: "translate(-50%,2%)", padding: "15px" }}>
            <Card.Header>
                <Card.Title>Create a New Poll!</Card.Title>
            </Card.Header>
            <Form.Label htmlFor="title">Enter Poll Title</Form.Label>
            <Form.Control id="title" type="text" placeholder="Poll Title" onChange={updatePollData} />
            <Form.Label htmlFor="description" style={{ marginTop: "10px" }}>Enter Poll Description</Form.Label>
            <Form.Control id="description" as="textarea" aria-label="Poll Description" onChange={updatePollData} />

            <Form.Label style={{ marginTop: "10px" }}>Choices</Form.Label>
            {choices}
            <Button onClick={addNewChoice}>Add New Choice</Button>
            <Row style={{ marginTop: "15px" }}>
                <Col md={6}><Button variant="outline-danger" onClick={navigateHome}>Cancel</Button></Col>
                <Col md={6}><Button variant="success" className="mt-2 mt-md-0" onClick={sendPollCreateReq}>Create</Button></Col>
            </Row>


        </Card>
    );
}

export default CreatePoll;