import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
function Create() {
 
 const [post,setPost] = useState({
    title:'',
    file:'',
    description:'',
    filter:'',
    startDate:'',
    endDate:'',
  });
console.log(post)
  const handleInput = (event) => {
    setPost({...post,[event.target.name]:event.target.value})
   }
   function handleSubmit(event){
    event.preventDefault();
    axios.post('https://shopify.beyondclub.xyz/node/data',{post})
    .then((response)=>{console.log(response);window.location.replace("/");})
    .catch(err=>console.log(err))
   }

  return (
    <Container>
    <div className="App">
      <header className="App-header">
        <Form
         onSubmit={handleSubmit}
        >
          {/*when user submit the form , handleSubmit()
      function will be called .*/}
          <h2> New NFT Form </h2>
          <Form.Group className="mb-3" >
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label>NFT image:</Form.Label>
          <Form.Control type="file" name="file"required onChange={handleInput} />
          </Form.Group>
          {/*when user write in age input box , handleAgeChange()
             function will be called. */}
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            required
            onChange={handleInput}
          />
          {/* when user write in email input box , handleEmailChange()
            function will be called.*/}
          <Form.Label>Filter:</Form.Label>
          <Form.Control
            type="text"
            name="filter"
            required
            onChange={handleInput}
          />
          <br />
          {/* when user write in password input box ,
                handlePasswordChange() function will be called.*/}
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="Date"
            name="startDate"
            required
            onChange={handleInput}
          />
          <br />
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="Date"
            name="endDate"
            required
            onChange={handleInput}
          />
          <br />
          {/* when user write in confirm password  input box ,
                  handleConfPasswordChange() function will be called.*/}
          <Button type="submit" variant="primary" value="Submit">
            Submit
          </Button>
        </Form>
      </header>
    </div>
    </Container>
  );
}

export default Create;
