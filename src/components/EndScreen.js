import React from 'react'
import ExitButton from './ExitButton';

const EndScreen = props => {
    return (
        <div id="grayout">
            <div id="menu">
                <h1>{props.decision === "won" ? "Wygrana" : "Przegrana"}</h1>
                <button onClick={props.gameRestart}>Zagraj jeszcze raz</button>
                <ExitButton exitGame={props.exitGame} />
            </div>
        </div>
    );
}

export default EndScreen;