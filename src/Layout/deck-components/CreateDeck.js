import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';

function CreateDeck() {
    const [ newDeckName, setNewDeckName ] = useState("");
    const [ newDeckDescription, setNewDeckDescription ] = useState("");

    const history = useHistory();

    const newDeckSubmitHandler = (event) => {
        event.preventDefault();
        createDeck({newDeckName, newDeckDescription})
        .then(response => {
            history.push(`/decks/${response.id}`);
        })
        setNewDeckName("");
        setNewDeckDescription("");
    };

    const cancelNewDeckHandler = (event) => {
        event.preventDefault();
        setNewDeckName("");
        setNewDeckDescription("");
        history.push("/");
    }

    return (
        <div className="create_deck">
            <div aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </div>
            <h2>Create Deck</h2>
            <div className="container">
                <form onSubmit={newDeckSubmitHandler}>
                    <label htmlFor="new_deck_name">Name</label>
                    <input
                    required
                    placeholder="Deck Name"
                    name="new_deck_name"
                    type="text"
                    onChange={(event) => setNewDeckName(event.target.value)}
                    value={newDeckName}
                    />
                    <br />
                    <label htmlFor="new_deck_description">Description</label>
                    <textarea
                    required
                    placeholder="Brief description of the deck"
                    name="new_deck_description"
                    type="text"
                    onChange={(event) => setNewDeckDescription(event.target.value)}
                    value={newDeckDescription}
                    />
                    <button onClick={cancelNewDeckHandler}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateDeck;