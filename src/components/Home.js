import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./Home.css"
import React from 'react'
import { useNavigate } from "react-router";

function Home() {

    const [items, setItems] = useState([])
    const [query, setQuery] = useState("test")
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async() => {
        const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
        const data = await res.json()
        setItems(data.hits)
        }

        fetchArticles()
        setIsLoading(false)
    }, [query])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!text) {
        alert("Enter a valid search query")
        }
        else{
        setQuery(text)
        setText("")
        }
    }


  return (
    <>
        <section className="section">
                <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="text" name="search" id="search" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)}/>
                <button>Search</button>
                </form>
                {isLoading ? <div className="spinner"></div> :
                <>
                    <div className="category">
                    <p>Category: <span>{query}</span></p>
                    </div>
                    <article className="cards">
                    {items.map(({ author, created_at, title, url, objectID }) =>(
                        <div className="cards-div" key={objectID}>
                        <h2>{title}</h2>
                        <ul>
                            <li>By {author}</li>
                            <li><a href={url} target="_blank" rel="noreferrer">Read Article</a></li>
                        </ul>
                        <p>{format(new Date(created_at), "dd MMMM yyyy")}</p>
                        <button onClick={() => navigate(`/post/${objectID}`)}>
                            Post Details
                        </button>
                        </div>
                    ))}
                    </article>
                </>        
                }
            </section>
        </> 
  )
}

export default Home
