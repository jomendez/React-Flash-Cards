import React from 'react';

function Card({ card }){
    
if (card) {
    return (
    <div className="container">
        <div className="row">
            <div className="col-6 text-center">
                <h4 className="p-1">Card Front</h4>
                    <p>{card.front}</p>
                </div>
                    <div className="col-6 text-center">
                        <h4 className="p-1">Card Back</h4>
                            <p>{card.back}</p>
                        </div>
                    </div>
                </div>
            )};
};
export default Card;