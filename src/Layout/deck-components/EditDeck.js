import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateDeck, readDeck } from '../../utils/api';

function EditDeck() {
    const [ deck, setDeck ] = useState([]);
    const [ editDeckName, setEditDeckName ] = useState(deck.name);
    const [ editDeckDescription, setEditDeckDescription ] = useState(deck.description);

    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        async function deckRender() {
            setDeck([]);
            try {
                const response = await readDeck(deckId);
                setDeck(response);
                setEditDeckName(response.editDeckName);
                setEditDeckDescription(response.editDeckDescription);
            }  catch (error) {
                console.log(error);
            }
        }
        deckRender();
    }, [deckId])
    
    const editSubmitHandler = (event) => {
        event.preventDefault();
        updateDeck(...deck, { editDeckName, editDeckDescription })
        .then(response => {
            setDeck(response);
            history.push(`/decks/${deck.id}`);
        })
    }

    const cancelEditDeckHandler = (event) => {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
    }

    if (deck) {
        return (
            <div className="edit_deck">
                <div aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${deckId}/edit`}>Edit Deck</Link></li>
                    </ol>
                </div>
                <br />
                <h2>Edit Deck</h2>
                <div className="container">
                <form onSubmit={editSubmitHandler}>
                    <label htmlFor="edit_deck_name">Name</label>
                <input
                required
                placeholder={deck.name}
                name="edit_deck_name"
                type="text"
                onChange={(event) => setEditDeckName(event.target.value)}
                value={editDeckName}
                />
                <br />
                <label htmlFor="edit_deck_description">Description</label>
                <textarea
                rows="5" cols="50"
                required
                placeholder={deck.description}
                name="edit_deck_description"
                type="text"
                onChange={(event) => setEditDeckDescription(event.target.value)}
                value={editDeckDescription}
                />
                </form>
                <button onClick={cancelEditDeckHandler}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </div>
        )
    };
}

export default EditDeck;