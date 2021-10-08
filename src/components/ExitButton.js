import React from 'react'

const ExitButton = (props) => {
    return (
        <>
            <button onClick={props.exitGame}>Wyjdź z gry</button>
        </>
    );
}

export default ExitButton;