import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import api from "../../../utils/api";
import { useState } from "react";

const Login = () => {
  const state = {
    email: "",
    password: "",
  };

  const { formData, setFormData } = useState(state);

  const onChange = (e) => {
    e.preventDefault();
  };

  const error = true;
  return (
    <Container>
      <h1 className='mt-4'>Login to your Account</h1>
      {error && (
        <Alert variant='danger' className='mt-5'>
          This is a alert—check it out!
        </Alert>
      )}
      <Form className='mt-5'>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => onChange(e)}
            name='email'
          />
          <Form.Text className='text-muted'>
            Please enter a Valid Email Address
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={(e) => onChange(e)}
            name='password'
          />
          <Form.Text className='text-muted'>
            password must be at least 6 carachter long
          </Form.Text>
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          size='lg'
          onSubmit={() => console.log("submitted")}
        >
          Login
        </Button>
        <Form.Text className='text-muted'>
          don't have an account? <Link to='/register'>register</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default Login;
