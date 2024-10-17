import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "./managers/UserProfileManager.js";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((r) => {
        if (r) {
          localStorage.setItem("userProfile", JSON.stringify(r));
          setIsLoggedIn(true);
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      });
  };

  return (
    <div className="container center">
      <h1 className="welcome-title">Welcome to the Quest for Glory</h1>
      <Form onSubmit={loginSubmit} className="box center">
        <fieldset>
          <FormGroup>
            <Label for="email" className="label">Email</Label>
            <Input id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="label">Password</Label>
            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button className="button">Login</Button>
          </FormGroup>
          <em>
            Not registered? <Link to="/register">Register</Link>
          </em>
        </fieldset>
      </Form>
    </div>
  );
}
