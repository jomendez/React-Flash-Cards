import React, {useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';

function AddCard(){
    const [ deck, setDeck ] = useState([]);
    const [ front, setFront ] = useState("");
    const [ back, setBack ] = useState("");

    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        async function deckRender() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }
        deckRender();
    }, [deckId]);

    const saveCardHandler = (event) => {
        event.preventDefault();
        createCard(deckId, {front, back});
        setFront("");
        setBack("");
    }

    const doneCardHandler = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);
    }

    if (deck) {
    return (
        <div className="add_card">
            <div aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </div>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={saveCardHandler}>
                <label htmlFor="add_card_front">Front</label>
                <textarea
                required
                placeholder="Front side of card"
                name="add_card_front"
                type="text"
                onChange={(event) => setFront(event.target.value)}
                value={front}
                />
                <br />
                <label htmlFor="add_card_back">Back</label>
                <textarea
                required
                placeholder="Back side of card"
                name="add_card_back"
                type="text"
                onChange={(event) => setBack(event.target.value)}
                value={back}
                />
                <button onClick={doneCardHandler}>Done</button>
                <button type="submit">Save</button>
            </form>
        </div>
    )
    };
}

export default AddCard;