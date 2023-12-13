import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import "./PostDetail.css"

function PostDetails() {
    const { objectID } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    console.log(objectID);

    useEffect(() => {
        const fetchPostDetails = async () => {
            const res = await fetch(`https://hn.algolia.com/api/v1/items/${objectID}`);
            const data = await res.json();
            setPost(data);
        }

        fetchPostDetails();
    }, [objectID]);

  return (
    <div className="post-detail">
      {post ? (
        <>
          <h1>Title: {post.title}</h1>
          <p>Points: {post.points}</p>
          <div className='comments'>
            <h2>Comments:</h2>
            <ol>
              {post.children &&
                post.children.map((comment) => (
                  <li key={comment.objectID}>{comment.text}</li>
                ))}
            </ol>
            <button onClick={() => navigate(`/`)}>
              Back
            </button>
          </div>
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  )
}

export default PostDetails

