import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import View from "./components/View";
import Nft from "./components/Nft";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar>
            <Container>
              <Navbar.Text>
                <Link to={"/"} className="nav-link">
                    View
                  </Link>
              </Navbar.Text>
              <Navbar.Text>
              <Link to={"/create"} className="btn btn-success text-white">
                  New NFT Drop
                </Link>
              </Navbar.Text>
            </Container>
          </Navbar>
          <Routes>
            <Route exact path="/create" element={<Create />}></Route>
            <Route path="/" element={<View />}></Route>
            <Route path ='/test' element={<Nft />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
