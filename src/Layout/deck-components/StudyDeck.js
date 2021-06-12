import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import FlipCard from '../card-components/FlipCard';

function StudyDeck() {
    const [ deck, setDeck ] = useState([]);
    const [ cards, setCards ] = useState([]);
    const [ flip, setFlip ] = useState(false);

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

    const flipHandler = () => {
        if (setFlip(!flip)) {
            return setFlip(true);
        } else {
            return setFlip(!flip);
        }
    }

    if (deck && cards) {
        return (
            <div className="study_deck">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${deckId}/study`}>Study</Link></li>
                    </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                <FlipCard currentCards={cards} />
            </div>
        )
    }
}

export default StudyDeck;