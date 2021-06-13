import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateCard } from '../../utils/api';

function EditCard() {
    const [ deck, setDeck ] = useState([]);
    const [cards, setCards ] = useState([]);
    const [ editCardFront, setEditCardFront ] = useState("");
    const [ editCardBack, setEditCardBack ] = useState("");

    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        async function deckRender() {
            try {
                const response = await readDeck(params.deckId)
                setDeck(response)
                setCards(response.cards.find((card) => (card.id + "") === params.cardId))
                setEditCardFront(response.cards.find((card) => (card.id + "") === params.cardId).front)
                setEditCardBack(response.cards.find((card) => (card.id + "") === params.cardId).back)
            } catch (error) {
                console.log(error)
            }
        }
        deckRender()
    }, [params]);
    
    const editCardSubmitHandler = (event) => {
        event.preventDefault();
        const updatedCard = {
            ...cards,
            editCardFront,
            editCardBack
        }
        updateCard(updatedCard)
        .then(response => {
            setCards(response);
            history.push(`/decks/${params.deckId}`);
        });
    };

    const editCardCancelHandler = (event) => {
        event.preventDefault();
        history.push(`/decks/${params.deckId}`);
    }
    if (deck && cards) {
        return (
            <div className="edit_card">
                <div aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${params.deckId}`}>Deck {deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cards.id}</li>
                    </ol>
                </div>
                <h2>Edit Card</h2>
                <form onSubmit={editCardSubmitHandler}>
                    <label htmlFor="edit_card_front">Front</label>
                    <textarea
                    required
                    placeholder={cards.front}
                    name="edit_card_front"
                    type="text"
                    onChange={(event) => setEditCardFront(event.target.value)}
                    value={editCardFront}
                    />
                    <br />
                    <label htmlFor="edit_card_back">Back</label>
                    <textarea
                    required
                    placeholder={cards.back}
                    name="edit_card_back"
                    type="text"
                    onChange={(event) => setEditCardBack(event.target.value)}
                    value={editCardBack}
                    />
                </form>
                <button onClick={editCardCancelHandler}>Cancel</button>
                    <button type="submit">Submit</button>
            </div>
        )
    }
}

export default EditCard;