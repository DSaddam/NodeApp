import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import NftCard from "./Card"

class View extends Component {
  render() {
    return (
      <Container>
          <h2>NFT Drop</h2>
          <NftCard />
          <NftCard />
      </Container>
    );
  }
}

export default View;
