import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { useCookies } from 'react-cookie';

const testApi = "http://localhost:8000/api";

const emailInputRef = React.createRef();
const passInputRef = React.createRef();

function SignIn(params) {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['voting-app']);
    const handle = (data = {}) => {
        for (let key in data) {
            let val = data[key];
            setCookie(key, val, { path: '/' });
        }
    }

    const signUserIn = async function () {
        let email = emailInputRef.current.value;
        let pass = passInputRef.current.value;

        let response = await fetch(testApi + "/user/sign-in", {
            "method": "POST",
            "headers": {
                "Content-type": "application/json"
            },
            "body": JSON.stringify({
                email: email,
                password: pass
            })
        });

        if (response) {
            let respData = await response.json();
            if (respData.success !== false) {
                handle({ "user-id": respData._id });
                navigate("/user");
            }
        }
    }


    return (
        <Card className="text-center" style={{ left: "50%", width: "22rem", transform: "translate(-50%,50%)", padding: "15px" }}>
            <Form>
                <h3>Sign In</h3>
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
                {/* <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                    </label>
                </div>
            </div> */}
                <Button variant="outline-primary" size="lg" onClick={signUserIn}>Submit</Button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href={'/sign-up'}>sign up</a>
                </p>
                {/* <p style={{textAlign:"right"}}>
                    Forgot <a href="#">password?</a>
                </p> */}
            </Form>
        </Card>

    )
}

export default SignIn;