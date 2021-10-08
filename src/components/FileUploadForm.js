import React, { useRef } from 'react'

const FileUploadForm = props => {
    const FileUpload = useRef(null)
    const clickHandler = (e) => {
        FileUpload.current.click()
    }
    return (
        <div id="WordsUpload">
            <p>Dodaj własne słowa</p>
            <p>{props.errorMessage}</p>
            <button onClick={clickHandler}>Wybierz plik</button>
            <form onSubmit={props.wordsUploadSubmitHandler}>
                <input type="file" name="file" id="file" ref={FileUpload} />
                <input type="submit" value="Wyślij" />
            </form>
        </div>
    )
}
export default FileUploadForm