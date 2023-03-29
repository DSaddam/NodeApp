import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function NftCard() {
  const [show, setShow] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState({});
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch("https://shopify.beyondclub.xyz/node/postdata")
      .then((response) => response.json())
      .then((data) => {
        console.log("response data", data);
        let res_array = [];
        // for(let i in data) {
        //    res_array.push([i,data[i]]);
        // };
        res_array = Array.from(Object.keys(data), (k) => data[k]);
        console.log("res array", res_array);
        setNfts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewClick = (nft) => {
    setSelectedNFT(nft);
    setShow(true);
  };

  const handleDeleteClick = (nft) => {
    axios
      .delete(`https://shopify.beyondclub.xyz/node/postdata/${nft.id}`)
      .then((response) => {
        if (response.status === 200) {
          setNfts(nfts.filter((item) => item.id !== nft.id));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {nfts.length > 0 &&
        Object.values(nfts).map((nft) => (
          <>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{nft.title}</div>
                {nft.description}
              </div>
              <Button onClick={() => handleViewClick(nft)} variant="link">
                View
              </Button>
              <Button onClick={() => handleDeleteClick(nft)} variant="link">
                Delete
              </Button>
            </ListGroup.Item>
          </>
        ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNFT.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedNFT.description}</p>
          <p>{selectedNFT.startDate}</p>
          <p>{selectedNFT.endDate}</p>
          <p>{selectedNFT.filter}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NftCard;
