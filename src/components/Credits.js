import React from 'react'

const Credits = (props) => {
    return (
        <>
            <h1>Strona wykonana przez Jakuba Filipka w oparciu o bibliotekÄ™ React.js</h1>
            <button onClick={props.toggleCredits}>Zamknij</button>
        </>
    );
}

export default Credits;