import React from 'react';

function Deck({ deck, cards }) {

    if (deck && cards) {
    return (
    <div className="deck">
        <div className="container">
            <div className="row justify-content-between">
                <h5 className="card-title font-weight-bold">{deck.name}</h5>
                <p className="text-secondary">{cards.length} Cards</p>
            </div>
        </div>
            <p className="card-text">{deck.description}</p>
        </div>
    )};
};

export default Deck;