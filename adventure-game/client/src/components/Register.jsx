import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "./managers/UserProfileManager.js";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Changed 'displayName' to 'username'
  const [errorMessage, setErrorMessage] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    // Create userObject including all necessary fields
    const userObject = {
      email,
      username,  // Include username instead of displayName
      isAdmin: false,  // Set isAdmin to false for non-admin users
      userTypeId: 0  // Assuming userTypeId is defaulted to 0 for now
    };

    register(userObject)
      .then(() => {
        navigate("/login"); // Redirect to login after successful registration
      })
      .catch(() => {
        setErrorMessage("Registration failed. Please try again.");
      });
  };

  return (
    <Form onSubmit={registerSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} required />
        </FormGroup>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <FormGroup>
          <Button type="submit">Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
