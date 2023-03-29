import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/esm/Container";
import NftCard from "./Card"

function View() {
  return (
    <Container>
      <h2>NFT Drop</h2>
      <ListGroup as="ul">
      <NftCard />
      </ListGroup>
    </Container>
  );
}


export default View;
