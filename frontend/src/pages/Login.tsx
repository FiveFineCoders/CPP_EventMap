import React, { useRef, useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, Button, Nav } from 'react-bootstrap';
import '../styles/login.css'


export const Login = (): JSX.Element => {



    const [loginMode, setLoginMode] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [Confirm, setConfirm] = useState("");


    const toggleMode = (): void => {

        setLoginMode(loginMode ? false : true)

    }

    return (
        <div className='login-background d-flex justify-content-center align-items-center'>
            
            <Form className="rounded py-3 px-4">
                <div className="mb-4 mt-2 login-title">
                    <p>{ loginMode ? "Login" : "Sign up" }</p>
                </div>

                <Form.Group className="mb-4" controlId="usernameInput">
                    <Form.Control placeholder="Username" />
                </Form.Group>
                <FormGroup className="mb-4" controlId="passwordInput">
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>
                { !loginMode && 

                    <Form.Group className="mb-3" controlId="confirmInput">
                        <FormControl type="password" placeholder="Confirm Password"/>
                    </Form.Group>
                                        
                }

                <div className = "mb-4 d-grid gap-2">
                    <Button variant="secondary" size="sm" >
                        {loginMode ? "Login" : "Sign Up"}
                    </Button>
                </div>

                <div className=" d-flex justify-content-center" onClick={toggleMode}>
                    <p className="login-mode-switch" >{loginMode ? "Create an account?" : "Already have an account?"}</p>
                </div>
                    
            </Form>
        </div>
    );


}