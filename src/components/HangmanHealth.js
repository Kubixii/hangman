import React from 'react'

const HangmanHealth = props => {
    const { faults } = props
    let image = ["blank.png", "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "6.png"];
    return (
        <>
            <img src={`/${image[faults]}`} alt="health" />
        </>
    )
}

export default HangmanHealth