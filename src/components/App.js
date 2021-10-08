import React, { Component } from 'react';
import '../css/App.css';
import { Alphabet } from './Alphabet.json'
import { words } from './Words.json'
import FileUploadForm from './FileUploadForm';
import AnswerField from './AnswerField';
import HangmanHealth from './HangmanHealth'
import Keyboard from './Keyboard';
import WordField from './WordField'
import EndScreen from './EndScreen';
import ExitButton from './ExitButton';
import Credits from './Credits';

class App extends Component {
  state = {
    alphabet: Alphabet,
    words: words,
    wordToGuess: null,
    faults: 0,
    haveWon: false,
    haveLost: false,
    gameStarted: false,
    errorMessage: null,
    showCredits: false
  }

  render() {
    const { alphabet, faults, wordToGuess, gameStarted, haveLost, haveWon, errorMessage, showCredits } = this.state

    const gameField = (
      <>
        <HangmanHealth faults={faults} />
        {wordToGuess === null ? null : <WordField wordToGuess={wordToGuess} />}
        <AnswerField answerFieldFormHandler={this.answerFieldFormHandler.bind(this)} />
        <Keyboard alphabet={alphabet} letterGuess={this.letterGuess.bind(this)} />
        <ExitButton exitGame={this.exitGame.bind(this)} />
      </>
    )

    const preGameField = (
      <div id="preGameDiv">
        <button onClick={this.wordDraw.bind(this)} id="startButton">Start</button>
        <FileUploadForm
          wordsUploadSubmitHandler={this.wordsUploadSubmitHandler.bind(this)}
          errorMessage={errorMessage}
        />
        <button onClick={this.toggleCredits.bind(this)} id="creditsButton">Credits</button>
      </div>
    )

    const game = (
      <>
        {gameStarted ? gameField : preGameField}
        {haveLost ? <EndScreen decision="lost" gameRestart={this.wordDraw.bind(this)} exitGame={this.exitGame.bind(this)} /> : null}
        {haveWon ? <EndScreen decision="won" gameRestart={this.wordDraw.bind(this)} exitGame={this.exitGame.bind(this)} /> : null}
      </>
    )
    return (
      <div id='game'>
        {showCredits ? <Credits toggleCredits={this.toggleCredits.bind(this)} /> : game}
      </div>
    );
  }

  wordsUploadSubmitHandler(e) {
    e.preventDefault()
    const file = e.target.file.files[0]
    if (file === undefined) {
      this.setState({
        errorMessage: "Brak pliku"
      })
    } else {
      if (file.type === "text/plain") {
        const fileReader = new FileReader()
        let lastWordId = this.state.words[this.state.words.length - 1].id
        fileReader.onload = e => {
          const text = e.target.result
          const stringWords = text.split("\r\n")

          const objectWords = stringWords.map(stringWord => {
            const word = stringWord.toLowerCase()
            return word.split('')

          })

          const completeArray = objectWords.map((word) => {
            lastWordId++
            const letters = word.map((letter, letterIndex) => {
              const object = {
                id: letterIndex,
                letter,
                visible: false
              }
              return object
            })
            const completedLetters = {
              id: lastWordId,
              letters
            }
            return completedLetters
          })
          this.setState({
            words: this.state.words.concat(completeArray),
            fileUploaded: true,
            errorMessage: null
          })
        }
        fileReader.readAsText(e.target.file.files[0])
        console.log(e.target.file.value)
        e.target.file.value = null
        console.log(e.target.file.value)
      } else {
        this.setState({
          errorMessage: "Błędne rozszerzenie pliku"
        })
      }
    }
  }

  wordDraw() {
    const wordsAmount = this.state.words.length
    const DrawnWord = Math.floor(Math.random() * (wordsAmount - 0))
    const wordToGuess = this.state.words[DrawnWord]
    this.setState({
      wordToGuess,
      gameStarted: true,
      haveWon: false,
      haveLost: false,
      faults: 0,
      alphabet: Alphabet
    })
  }

  letterGuess(pickedLetter) {
    const alphabet = this.state.alphabet.map(letter => {
      let newLetter = {
        id: letter.id,
        letter: letter.letter,
        picked: letter.picked
      }
      if (pickedLetter === letter.letter) {
        newLetter.picked = true
      }
      return newLetter
    })
    let didGuess = false;
    const wordToGuessLetters = this.state.wordToGuess.letters.map(letter => {
      let newLetter = {
        id: letter.id,
        letter: letter.letter,
        visible: letter.visible
      }
      if (pickedLetter === letter.letter) {
        didGuess = true;
        newLetter.visible = true
      }
      return newLetter
    })

    const wordToGuess = {
      id: this.state.wordToGuess.id,
      letters: wordToGuessLetters
    }

    this.checkGameState(didGuess, false, wordToGuess)
    this.setState({
      alphabet,
      wordToGuess
    })
  }

  answerFieldFormHandler(e) {
    e.preventDefault()
    if (e.target.answer.value !== "") {
      const inputedWord = e.target.answer.value.toLowerCase()
      e.target.answer.value = ""
      const wordToGuessLetters = this.state.wordToGuess.letters.map((letter, index) => {
        let newLetter = {
          id: letter.id,
          letter: letter.letter,
          visible: letter.visible
        }
        if (inputedWord[index] === letter.letter) {
          newLetter.visible = true
        }
        return newLetter
      })

      const wordToGuess = {
        id: this.state.wordToGuess.id,
        letters: wordToGuessLetters
      }
      this.checkGameState(true, true, wordToGuess)
    }
  }

  revealWord() {
    const wordToGuessLetters = this.state.wordToGuess.letters.map(letter => {
      return {
        id: letter.id,
        letter: letter.letter,
        visible: true
      }
    })

    const wordToGuess = {
      id: this.state.wordToGuess.id,
      letters: wordToGuessLetters
    }
    this.setState({
      wordToGuess
    })
  }

  checkGameState(didGuess, fromAnswerField, wordToGuess) {
    let faults = this.state.faults
    const lettersInAWord = wordToGuess.letters.length
    const guessedLetters = wordToGuess.letters.filter(letter => letter.visible === true).length
    if (((lettersInAWord !== guessedLetters) && fromAnswerField) || !didGuess) {
      faults += 1
    }
    if (faults === 7 || lettersInAWord === guessedLetters) {
      this.revealWord()
    }
    if (faults === 7) {
      this.setState({
        haveLost: true
      })
    }
    if (lettersInAWord === guessedLetters) {
      this.setState({
        haveWon: true
      })
    }

    this.setState({
      faults
    })
  }

  exitGame() {
    this.setState({
      wordToGuess: null,
      gameStarted: false,
      haveWon: false,
      haveLost: false,
      faults: 0,
      alphabet: Alphabet
    })
  }

  toggleCredits() {
    this.setState({
      showCredits: !this.state.showCredits
    })
  }
}

export default App;