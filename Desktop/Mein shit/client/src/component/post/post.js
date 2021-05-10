import React from "react";
import Button from "react-bootstrap/Button";

export const post = () => {
  return (
    <div className='container'>
      <img src='https://cdna.artstation.com/p/assets/images/images/024/748/762/large/livia-prima-img-20200305-181700-084.jpg?1583407638'></img>
      <div className='inner-section'>
        <h2 className='title'>this the title</h2>
        <p>
          text this is where the text is and this is where everything is set you
          have to pay more attention to you thoughts to day dreams to your
          feelings and ego assertion
        </p>
      </div>
      <div className='like-comment'>
        <div className='like'>
          <i class='far fa-thumbs-up'></i>
          <i class='far fa-thumbs-down'></i>
        </div>
        <div className='comment'>
          <form onSumbit={() => console.log("yes")}>
            <input type='textarea' placeholder='add comment' />
            <Button>add comment</Button>
          </form>
        </div>
      </div>
      <p>created in 20/02/1992</p>
    </div>
  );
};
