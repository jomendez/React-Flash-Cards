import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import CardList from '../card-components/CardList';
import Deck from './Deck';

import { deleteDeck, readDeck } from '../../utils/api';

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
        <div className="view_deck pb-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div className="container">
            <h2 className="p-2">View Deck</h2>
            <div className="card p-1">
            <div className="card-body">
            <Deck deck={deck} cards={cards} />
            <br />
            <div className="container">
            <div className="row justify-content-between">
                    <div className="row">
            <span className="p-1">
            <Link className="btn btn-primary" to={`/decks/${deckId}/study`}>Study</Link>
            </span>
            <span className="p-1">
            <Link className="btn btn-warning"to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
            </span>
            </div>
            <div className="row">
            <span className="p-1">
            <Link className="btn btn-info" to={`/decks/${deckId}/edit`}>Edit Deck</Link>
            </span>
            <span className="p-1">
            <button className="btn btn-danger" onClick={deleteDeckHandler}>Delete Deck</button>
            </span>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div className="container justify-content-center">
            <h3 className="p-2">Cards</h3>
            <CardList deck={deck} cards={cards} />
            </div>
            </div>
    )
    }
    return <p>No decks available...</p>
}

export default ViewDeck;