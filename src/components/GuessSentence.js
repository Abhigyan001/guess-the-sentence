import CurrentScore from "./CurrentScore.js";
import SingleWord from './SingleWord.js';

export default function GuessSentence(props) {
  const { sentenceIndex, sentence, updateScore, scoreCount } = props

  let array = sentence.split(" ")

  let displayLine = array.map(word => <SingleWord word={word}
    wordIndex={`${sentenceIndex}-${array.indexOf(word)}`}
    updateScore={updateScore}
  />)


  return(
    <div id="guessSentence">
      <CurrentScore score={scoreCount} />
      <div className="displayLine">
        {displayLine}
      </div>
    </div>
  )
}