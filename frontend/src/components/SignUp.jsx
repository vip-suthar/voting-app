import React from "react";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const testApi = "http://localhost:8000/api";

const nameInputRef = React.createRef();
const emailInputRef = React.createRef();
const passInputRef = React.createRef();

function SignUp(params) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['voting-app']);
    const handle = (data = {}) => {
        for (let key in data) {
            let val = data[key];
            setCookie(key, val, { path: '/' });
        }
    }

    const signUserUp = async function () {
        let name = nameInputRef.current.value;
        let email = emailInputRef.current.value;
        let pass = passInputRef.current.value;

        console.log(name, email, pass);

        let response = await fetch(testApi + "/user/sign-up", {
            "method": "POST",
            "cache": 'no-cache',
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                name: name,
                email: email,
                password: pass
            })
        });

        if (response) {
            let respData = await response.json();
            if (respData.success !== false) {
                handle({ "user-id": respData._id });
                navigate("/")
            } else {
                alert(respData.message);
            }
        }


    }

    return (
        <Card className="text-center" style={{ left: "50%", width: "22rem", transform: "translate(-50%,30%)", padding: "15px" }}>
            <Form>
                <h3>Sign Up</h3>
                <FloatingLabel
                    controlId="floatingFullName"
                    label="Full Name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Enter Fullname" ref={nameInputRef} />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingPass"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control type="password" placeholder="Enter password" ref={passInputRef} />
                </FloatingLabel>
                <Button variant="outline-primary" size="lg" onClick={signUserUp}>Sign Up</Button>
                <p className="forgot-password text-right">
                    Already registered <a href={'/sign-in'}>sign in?</a>
                </p>
            </Form>
        </Card>
    );
}

export default SignUp;