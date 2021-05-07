import React from "react";
import Button from "react-bootstrap/Button";

export const CreateAccount = ({ history }) => {
  return (
    <div>
      <div className='mt-4 ml-4 align'>
        / <h2>you dont have an account yet</h2>
        <Button
          size='lg'
          className='primary mt-4'
          onClick={() => history.push("/create-profile")}
        >
          Create Account
        </Button>
      </div>{" "}
    </div>
  );
};
