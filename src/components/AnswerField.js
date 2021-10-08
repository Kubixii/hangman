import React from 'react'

const AnswerField = props => {
    return (
        <div id='AnswerField'>
            <form onSubmit={props.answerFieldFormHandler} method="POST">
                <input type="text" name="answer" id="answer" />
                <input type="submit" value="Sprawdź odpowiedź" />
            </form>
        </div>
    );
}

export default AnswerField;