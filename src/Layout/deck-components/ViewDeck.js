import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteCard, deleteDeck, readDeck } from '../../utils/api';

function ViewDeck() {
    const [ deck, setDeck ] = useState([]);
    const [ cards, setCards ] = useState([]);

    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        async function deckRender() {
            setDeck([]);
            setCards([]);
            try {
                const response = await readDeck(deckId);
                setDeck(response);
                const { cards } = response;
                setCards(cards);
            } catch (error) {
                console.log(error);
            }
        }
        deckRender();
    }, [deckId]);

    const deleteDeckHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deck.id);
            history.push("/");
        }
    }

    if (deck && cards) {
    return (
        <div className="view_deck">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}>Edit</Link>
            <Link to={`/decks/${deckId}/study`}>Study</Link>
            <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
            <button onClick={deleteDeckHandler}>Delete</button>
            <h2>Cards</h2>
            {cards.map((card) => (
            <div className="card" key={card.id}>
                <div className="card-body">
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link>
                                    <button onClick={() => {
                                        if(window.confirm("Delete this card? You will not be able to recover it.")) {
                                            deleteCard(card.id);
                                            history.push(`/decks/${deckId}`);
                                    }}}>Delete</button>
                                </div>
                            </div>
            ))}
        </div>
    )
    }
    return <p>No decks available...</p>
}

export default ViewDeck;