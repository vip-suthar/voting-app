import React, { useState } from "react";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function WelcomeCard() {
  const navigate = useNavigate();

  const [pollId, setPollId] = useState();

  return (
    <Card className="text-center" style={{ left: "50%", width: "18rem", transform: "translate(-50%,50%)", padding: "15px" }}>
      <Form.Label> Sign In to do cool stuff! </Form.Label>
      <Button href={'/sign-in'} variant="outline-success" size="lg" >
        Sign In
      </Button>
      <hr />
      <Form.Label> OR <br /> Enter a Poll Id to vote Anonymously</Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Poll Id"
        className="mb-3"
        style={{ marginBottom: "10px" }}
      >
        <Form.Control type="text" placeholder="Poll Id" onChange={(e)=>{setPollId(e.target.value)}}/>
      </FloatingLabel>
      <Button variant="outline-primary" onClick={()=>{navigate("/cast-vote", {state: {id: pollId}})}}>Submit</Button>
    </Card>
  );
}
export default WelcomeCard;