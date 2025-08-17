import React, { useEffect } from "react"
import { languagesData } from "./languages"
import clsx from "clsx"
// import nanoid from "nanoid"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"


export default function AssemblyEndgame() {

    // State values
    const [guessedLetters, setGuessedLetters] = React.useState([])
    // const [currentWord, setCurrentWord] = React.useState(() =>getRandomWord())
    const [currentWord, setCurrentWord] = React.useState("react")
    const [message, setMessage] = React.useState("")
    
    // Const values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    // derived Values
    let wrongGuessCount = 
        guessedLetters.filter(letter => (!currentWord.includes(letter))).length
    
    let isGameLost = (wrongGuessCount >= languagesData.length-1)
    let isGameWon = (!isGameLost && currentWord.split("").every(i => guessedLetters.includes(i)))
    let isGameOver = isGameLost || isGameWon


        
    const languages = languagesData.map((language, index) =>{
        const className = index < wrongGuessCount? "language lost" : "language"
        return(
            <span 
                className={className}
                style={{backgroundColor:language.backgroundColor, color:language.color}}
                key={language.name}
            >{language.name}</span>
        )
    })

    const letters = currentWord.split("").map((letter,index) => {
        const isGuessed = guessedLetters.includes(letter)
        const className = clsx("letter",{"is-transparent":!isGuessed && !isGameOver, "is-lost": !isGuessed && isGameOver})
        return(
        <span 
            key={index} 
            className={className}
        >
            {letter.toUpperCase()}
        </span>
        )
    })

    const keyboardButtons =alphabet.split("").map(letter =>{
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx("",{"green": isCorrect, "red": isWrong})
        return(
            <button 
                key={letter}
                className= {className}
                onClick={
                    () => setLetterGuessed(letter)
                }
                disabled={isGameOver}
                

                
            >
                {letter.toUpperCase()}
            </button>
        )
        })
    
    function setLetterGuessed(letter){
        setGuessedLetters((guessedArray) => (
            guessedArray.includes(letter)?
                guessedArray:
                [...guessedArray, letter]
        ))
        }

    function renderGameStatus(){
        if (isGameWon){
            return(
                <>
                    <h2>You win!</h2>  
                    <p>Well Done!🎉</p>
                </>
            )
        }
        else if (isGameLost){
            return(
                <>
                    <h2>Game over!</h2>  
                    <p>You better start learning Assembly 😥</p>
                </>
            )
        }
        else {
            return(
                <h2>{message}</h2>
            )
        
        }
        
    }


    useEffect(() =>{
        wrongGuessCount==0 ?
        setMessage(""):
        setMessage(getFarewellText(languagesData[wrongGuessCount-1].name))
    }
    , [wrongGuessCount])

    function newGame() {
        setCurrentWord(getRandomWord)
        setGuessedLetters([])
        setMessage("")
    }
    


    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the 
                    programming world safe from Assembly!</p>
            </header>
            <section className={clsx("game-status",{ "farewell": (isGameOver==false && wrongGuessCount>=1 ),"won": isGameWon, "lost": isGameLost})}>
                {renderGameStatus()}
            </section>
            <div className="languages">
                {languages}
            </div>
            <section className="currentWord">
                {letters}
            </section>
            <section className="keyboard">
                {keyboardButtons}
            </section>
            {isGameOver && <button onClick={() => newGame()} className="new-game">New Game</button>}
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
        </main>
    )
}
