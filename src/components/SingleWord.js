import SpaceContainer from './SpaceContainer';
import LetterContainer from './LetterContainer';

export default function SingleWord(props) {
  const { word, wordIndex, updateScore } = props

  let array = word.split("")

  const showLetters = array.map(letter => <LetterContainer
    letter={letter}
    array={array}
    letterIndex={`${wordIndex}-${array.indexOf(letter)}`}
    updateScore={updateScore}
  />);

  return(
    <div className="singleWord" id={`singleWord${wordIndex}`}>
      {showLetters}
      <SpaceContainer updateScore={updateScore}
      array={array}
      spaceIndex={`${wordIndex}-endSpace`} />
    </div>
  )
}
