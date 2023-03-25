import React from "react";
import Card from "react-bootstrap/Card";
import { useState,useEffect } from "react";
// import axios from "axios";
function NftCard() { 

let api="http://localhost:3001/postdata";
const [getPost,setGetPost]=useState([]);

const fatchApiData = async(url)=>{
 try{
  const res= await fetch(url);
  setGetPost(await res.json());
 }catch(error){
   console.log(error);
 }
 }
 
 useEffect(()=>{
   fatchApiData(api);
 },[])

  return (
    <>
        {
        getPost.map((curentPost)=>{
           return(
            <Card>
            <Card.Header>{curentPost.id}</Card.Header>
              <Card.Body>
                <Card.Text>{curentPost.title}</Card.Text>
                <Card.Text>{curentPost.file}</Card.Text>
                <Card.Text>{curentPost.description}</Card.Text>
                <Card.Text>{curentPost.filter}</Card.Text>
                <Card.Text>{curentPost.startDate}</Card.Text>
                <Card.Text>{curentPost.endDate}</Card.Text>


                <Card.Link>View</Card.Link>
                <Card.Link>Delete</Card.Link>
              </Card.Body>
              </Card>
            
           )
        })
      }
      </>
  );
}

export default NftCard;
