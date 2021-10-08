import React from 'react'

const Credits = (props) => {
    return (
        <>
            <h1>Strona wykonana przez Jakuba Filipka w oparciu o bibliotekę React.js</h1>
            <button onClick={props.toggleCredits}>Zamknij</button>
        </>
    );
}

export default Credits;