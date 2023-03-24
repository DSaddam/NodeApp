import React from "react";
import Card from "react-bootstrap/Card";

function NftCard() {
  return (
      <Card>
        <Card.Header>Name</Card.Header>
        <Card.Body>
          <Card.Text>Description</Card.Text>
          <Card.Link>View</Card.Link>
          <Card.Link>Delete</Card.Link>
        </Card.Body>
      </Card>
  );
}

export default NftCard;
