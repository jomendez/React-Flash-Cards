import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import DeckList  from "./deck-components/DeckList";

import { listDecks } from '../utils/api';

function Home() {
    const [decks, setDecks] = useState([]);

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

    if (decks) {
        return (
        <div className="home">
            <div className="home_link p-2">
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
                </div>
                <div className="container">
                    <h2 className="p-2">Available Decks</h2>
                    <DeckList />
                    </div>
                </div>
            )
        };
        return <p>No decks yet...</p>
};

export default Home;