import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck, listDecks } from '../utils/api';

function Home() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function decksFromApi() {
            try {
                const response = await listDecks()
                setDecks(response);
            } catch (error) {
                console.log(error);
            }
        }
        decksFromApi();
    }, []);

    const deleteHandler = () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(decks.id);
            history.push("/");
        }
    }

    if (decks) {
    return (
        <div className="home">
    <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
    <br />
    <ul>
        {decks.map((deck) => (
            <li key={deck.id}>
                <h2>{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}`}>View</Link>
                <Link to={`/decks/${deck.id}/edit`}>Edit</Link>
                <Link to={`/decks/${deck.id}/study`}>Study</Link>
                <button onClick={deleteHandler}>Delete</button>
            </li>
        ))}
    </ul>
    </div>
    )
    };
    return <p>No decks yet...</p>
}

export default Home;