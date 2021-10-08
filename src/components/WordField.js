import React from 'react'

const WordField = props => {
    const word = props.wordToGuess.letters.map(letter => {
        return (
            <GuessingFieldLetter key={letter.id} visible={letter.visible} letter={letter.letter} />
        )
    })
    return (
        <div id='WordField'>
            {props.wordToGuess === null ? null : word}
        </div>
    );
}

export default WordField;

const GuessingFieldLetter = props => {
    const { visible, letter } = props
    return (
        <div className={letter === " " ? "GuessingFieldLetter, noUnderline" : "GuessingFieldLetter"}>
            <span>{visible ? letter : null}</span>
        </div>
    )
}