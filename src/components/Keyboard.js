import React from 'react'

const Keyboard = props => {
    return (
        <div id='keyboard'>
            {props.alphabet.map(letter => {
                return (
                    <Letter key={letter.id} letter={letter.letter} letterGuess={props.letterGuess} picked={letter.picked} />
                )
            })}

            {/* {Object.keys(props.alphabet).map(i => {
                return (
                    <Letter key={props.alphabet[i].id} letter={props.alphabet[i].letter} letterGuess={props.letterGuess} picked={props.alphabet[i].picked} />
                )
            })} */}
        </div>
    )
}

export default Keyboard;

const Letter = props => {
    const { letter, picked, letterGuess } = props
    return (
        <div className={picked ? "nonclickable letter" : "clickable letter"} onClick={picked ? null : () => letterGuess(letter)}>
            <span>{letter}</span>
        </div>
    )
}