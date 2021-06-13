import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function FlipCard({ cards }) {
    const [flip, setFlip] = useState(false);
    const [viewCard, setViewCard] = useState(undefined);
    const [cardIndex, setCardIndex] = useState(1);
    const [viewCardTotal, setViewCardTotal] = useState(0);

    const history = useHistory();
    const params = useParams();

    const sortedCards = cards.sort((a, b) => a.id - b.id);

    useEffect(() => {
        if (cards.length > 2) {
            setFlip(true);
        }
        setViewCard(sortedCards[viewCardTotal])
    }, [cards, sortedCards, viewCardTotal]);
    
    const flipButtonHandler = (event) => {
        event.preventDefault();
        setFlip(!flip);
    }


    const nextButtonHandler = (e) => {
        e.preventDefault()
        setFlip(!flip);
        setCardIndex((current) => current + 1)
        setViewCardTotal((current) => current + 1)
        setViewCard(sortedCards[viewCardTotal + 1])
        if(cards.length <= cardIndex){
            if(window.confirm("Restart Cards?")){
                setCardIndex(1);
                setViewCardTotal(0);
                setViewCard(sortedCards[viewCardTotal]);
                history.push(`/decks/${params.deckId}/study`)
            } else {history.push("/")}
        }
    }

    const handleAddCards = (e) => {
        e.preventDefault()
        history.push(`/decks/${params.deckId}/cards/new`)
    }

    if (cards.length > 2 && viewCard) {
        return (
            <div className="container">
                <h4>Card {cardIndex} of {cards.length}</h4>
                    {flip ? <p>{viewCard.front}</p> : <p>{viewCard.back}</p>}
                        <div className="container">
                            <div className="row">
                                <div className="p-1">
                                    <button className="btn btn-secondary" onClick={flipButtonHandler}>Flip</button>
                                </div>
                                    {!flip ? (
                                        <div className="p-1">
                                            <button className="btn btn-primary" onClick={nextButtonHandler}>Next</button>
                                        </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <h4>Not enough cards.</h4>
                                            <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                                                <button className="btn btn-warning"onClick={handleAddCards}>+ Add Cards</button>
                                            </div>
                                            )
                                        }
                                    };

export default FlipCard;