import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function NftCard() {
  const [show, setShow] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState({});
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch("https://shopify.beyondclub.xyz/node/postdata")
      .then((response) => response.json())
      .then((data) => setNfts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewClick = (nft) => {
    setSelectedNFT(nft);
    setShow(true);
  };

  const handleDeleteClick = (nft) => {
    fetch(`https://shopify.beyondclub.xyz/node/postdata/${nft.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNfts(nfts.filter((item) => item.id !== nft.id));
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {nfts.map((nft) => (
        <Card key={nft.id}>
          <Card.Header>{nft.id}</Card.Header>
          <Card.Body>
            <Card.Text>{nft.title}</Card.Text>
            <Card.Text>{nft.file}</Card.Text>
            <Card.Text>{nft.description}</Card.Text>
            <Card.Text>{nft.filter}</Card.Text>
            <Card.Text>{nft.startDate}</Card.Text>
            <Card.Text>{nft.endDate}</Card.Text>

            <Card.Link onClick={() => handleViewClick(nft)}>View</Card.Link>
            <Card.Link onClick={() => handleDeleteClick(nft)}>Delete</Card.Link>
          </Card.Body>
        </Card>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNFT.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedNFT.description}</p>
          <img src={selectedNFT.file} alt={selectedNFT.title} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NftCard;
