import {useEffect, useState} from 'react';

export default function LetterContainer(props) {
  const { updateScore, letterIndex } = props
  const [input, setInput] = useState("")
  const [isMatch, setIsMatch] = useState(false)

  const letter = String(props.letter)
  let id = `letterContainer${letterIndex}`

  useEffect(() => {
    setInput("")
    setIsMatch(false)
  }, [id])

  function handleChange(e) {
    e.preventDefault();
    const {value} = e.target
    setInput(value)
    compareInput(letter, value)
    console.log(e.target.id)
  }

  function compareInput(letter, value) {
    let lowerValue = value.toLowerCase()
    let lowerLetter = letter.toLowerCase()
    if (lowerValue === lowerLetter) {
      setIsMatch(true)
      updateScore()
    } else {
      setIsMatch(false)
    }
  }

  function nextInputFocus(e) {
    e.preventDefault();
    e.target.nextElementSibling.focus()
  }

  return(
    <input className="letterContainer"
      id={id}
      type="text"
      value={input}
      name={`letter`}
      onChange={handleChange}
      onKeyUp={nextInputFocus}
      style={isMatch ? {backgroundColor: "#4caf50"} : {backgroundColor: "#e1e1e1"} }
      maxLength="1">
    </input>
  )
}
