import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "./../../../redux/actions/alertActions";
import { register } from "../../../redux/actions/authActions";

const Login = () => {
  const alertState = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  const state = {
    psuedo: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState({
    psuedo: "",
    email: "",
    password: "",
  });

  const { psuedo, password, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (!psuedo || !email || !password) {
      dispatch(setAlert("please fill all the fields dawg", "danger"));
    }
    e.preventDefault();

    dispatch(register(formData));
    // const newUser = {
    //   psuedo,
    //   email,
    //   password,
    // };

    // try {
    //   const res = await api.post("/auth/register", newUser);
    //   console.log(res.data);
    // } catch (error) {
    //   console.error(error.response.data);
    // }
  };

  const error = true;
  return (
    <Container>
      <h1 className='mt-4'>Register an Account</h1>
      {alertState.length > 0 &&
        alertState.map((alert, index) => (
          <Alert key={index} variant={alert.alertype} className='mt-5'>
            {alert.msg}
          </Alert>
        ))}
      <Form className='mt-5' onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Psuedo</Form.Label>
          <Form.Control
            type='name'
            placeholder='Choose a psuedo'
            onChange={(e) => onChange(e)}
            name='psuedo'
            value={psuedo}
          />
          <Form.Text className='text-muted'>what should we call you</Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='email'
            onChange={(e) => onChange(e)}
            name='email'
            value={email}
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
            value={password}
          />
          <Form.Text className='text-muted'>
            password must be at least 6 carachter long
          </Form.Text>
        </Form.Group>
        <Button variant='dark' type='submit' size='lg'>
          Register
        </Button>
        <Form.Text className='text-muted'>
          already have an account? <Link to='/Login'>Login</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default Login;
