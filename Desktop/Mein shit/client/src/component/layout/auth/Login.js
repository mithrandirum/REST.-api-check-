import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { login } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";

const Login = ({ history }) => {
  const authReducer = useSelector((state) => state.authReducer);
  const alerReducer = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  const state = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(state);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData, history));

    if (authReducer.isAuthenticated) {
      history.push("/profile");
    }
  };

  const component = (
    <div className='form-width dude'>
      <h1 className='mt-4 mb-4' style={{ textAlign: "center" }}>
        Login to your Account
      </h1>
      {alerReducer.length > 0 &&
        alerReducer.map((alert) => (
          <Alert variant={alert.alertype} className='mt-5'>
            {alert.msg}
          </Alert>
        ))}
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
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
    </div>
  );

  const spinner = (
    <div className='center'>
      <Container>
        <Spinner animation='border' className='lg' />
      </Container>
    </div>
  );
  const com = <>{authReducer.loading ? spinner : component}</>;

  return <> {authReducer.isAuthenticated ? <Redirect to='/profile' /> : com}</>;
};

export default Login;
