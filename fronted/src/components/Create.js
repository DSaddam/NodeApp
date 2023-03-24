import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

function Create() {
  const [title, setTitle] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

  // function to update state of name with
  // value enter by user in form
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  // function to update state of age with value
  // enter by user in form
  const handleNftImageChange = (e) => {
    setNftImage(URL.createObjectURL(e.target.files[0]));
  };
  // function to update state of email with value
  // enter by user in form
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  // function to update state of password with
  // value enter by user in form
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // function to update state of confirm password
  // with value enter by user in form
  const handleEndDateChange = (e) => {
    setendDate(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setstartDate(e.target.value);
  };
  // below function will be called when user
  // click on submit button .
  const handleSubmit = (e) => {
    const nftJson = {
      "title": title,
      "description": description,
      "image": nftImage,
      "filter": filter,
      "start_date": startDate,
      "end_date": endDate
    };
    fetch('https://shopify.beyondclub.xyz:3002/store-data', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(nftJson)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    e.preventDefault();
  };
  return (
    <Container>
    <div className="App">
      <header className="App-header">
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*when user submit the form , handleSubmit()
      function will be called .*/}
          <h2> New NFT Form </h2>
          <Form.Group className="mb-3" >
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              required
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label>NFT image:</Form.Label>
          <Form.Control type="file" required onChange={handleNftImageChange} />
          <img src={nftImage} alt="nft" width="50" />
          </Form.Group>
          {/*when user write in age input box , handleAgeChange()
             function will be called. */}
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            required
            onChange={handleDescriptionChange}
          />
          <br />
          {/* when user write in email input box , handleEmailChange()
            function will be called.*/}
          <Form.Label>Filter:</Form.Label>
          <Form.Control
            type="text"
            value={filter}
            required
            onChange={handleFilterChange}
          />
          <br />
          {/* when user write in password input box ,
                handlePasswordChange() function will be called.*/}
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="Date"
            value={startDate}
            required
            onChange={handleStartDateChange}
          />
          <br />
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="Date"
            value={endDate}
            required
            onChange={handleEndDateChange}
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
