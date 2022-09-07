import "./UserProfile.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from "../components/ReviewForm";
import {
  Card
} from 'react-bootstrap';


const UserSingleBook = (props) => {
  const { bookId: bookParam } = useParams();
  const [ bookData, setBookData ] = useState('')
  
  const getBookData = async(bookParam) => {
    const response = await fetch("../api/book/"+bookParam)
    const parsedResponse = await response.json()
    if( parsedResponse && parsedResponse.result === "success" ){
      setBookData(parsedResponse.payload)
    }
  }

  useEffect(() => {
    getBookData(bookParam);
  }, [bookParam])


  if (bookData) {
    return (
      <Card key={bookData._id} border="dark">
        {bookData.cover ? (
          <Card.Img
            src={bookData.cover}
            alt={`The cover for ${bookData.title}`}
            variant="top"
          />
        ) : null}
        <Card.Body>
          <Card.Title>{bookData.title}</Card.Title>
          <p className="small">Authors: {bookData.authors}</p>
          <p>
            <>Posted By: You -  </>
            <Link
              to={`/profile/${bookData.username}`}
            >{bookData.username}
          </Link>{' '}
          on {bookData.createdAt}</p>
          <Card.Text>{bookData.review}</Card.Text>
        </Card.Body>
        <br />
        <br />
        <br />
        <br />
        <div className="mb-3">{<ReviewForm bookId={bookData._id} />}</div>
      </Card>
    )
  };
}

export default UserSingleBook;