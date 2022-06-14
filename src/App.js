import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ScrambledSentence from './components/ScrambledSentence';
import GuessSentence from './components/GuessSentence';

export default function App() {

  const [sentence, setSentence] = useState("")
  const [sentenceNumber, setSentenceNumber] = useState(1)
  const [isGameOver, setIsGameOver] = useState(false)

  const [sentenceCount, setSentenceCount] = useState(0)
  const [score, setScore] = useState(0)
  const [scoreCount, setScoreCount] = useState(0)

  const getSentence = useCallback(
    (sentenceNumber) => {
      fetch(`https://api.hatchways.io/assessment/sentences/${sentenceNumber}`)
        .then(res => res.json())
        .then(
          (result) => {
            setSentence(result.data.sentence)
            setSentenceCount(sentence.length)
          },
          (error) => {
            console.log(error)
          }
        )
    }, [sentence.length]
  );

  useEffect(() => {
    getSentence(sentenceNumber)
    if (isGameOver === false) {
      let focused = document.getElementById(`letterContainer${sentenceNumber}-0-0`)
      focused && focused.focus()

      let nextBtn = document.getElementById("nextSentenceButton")
      nextBtn.style.visibility = 'hidden'
    }
  }, [sentence, sentenceNumber, isGameOver, getSentence])

  function updateScore() {
    setScore(prev => prev + 1)
  }

  function compareScore() {
    if (score === sentenceCount + 1) {
      setScoreCount(prev => prev + 1)
    } else {
      console.log(scoreCount)
    }
  }

  function getNextSentence() {
    setScore(0)
    if (sentenceNumber < 10) {
      setSentenceNumber(prev => prev + 1)
      compareScore()
      getSentence(sentenceNumber)
    } else {
      setIsGameOver(true)
    }
  }

  return (
    <div className="App">
      <div className="container">
        {isGameOver && score === 10 ? <h1 className="header">"You Win!!!"</h1> : "" }
        {isGameOver && score < 10 ? <h1 className="header">"You Lost"</h1> : "" }
        {isGameOver ? "" : <ScrambledSentence sentence={sentence} />}
        {isGameOver ? " " : <div><p>Guess the sentence! Start typing...</p>
        <br/>
        <p>The yellow blocks are meant for spaces.</p></div>}
        {isGameOver ? " " : <GuessSentence sentence={sentence} 
            sentenceIndex={`${sentenceNumber}`}
            score={score}
            updateScore={updateScore}
            scoreCount={scoreCount}
            />}
        {isGameOver ? "" :
          <button id="nextSentenceButton"
            style={{visibility:'hidden'}}
            onClick={getNextSentence}>Next</button>}
      </div>
    </div>
  );
}
