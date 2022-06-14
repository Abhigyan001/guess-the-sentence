import {useState, useEffect} from 'react';

export default function SpaceContainer(props) {
  const { spaceIndex, updateScore } = props
  const [input, setInput] = useState("")
  const [isMatch, setIsMatch] = useState(false)

  const spaceCharacter = " "
  let id = spaceIndex

  useEffect(() => {
    setInput("")
    setIsMatch(false)
  }, [id])

  function handleChange(e) {
    e.preventDefault();
    const {value} = e.target
    setInput(value)
    compareValues(spaceCharacter, value)
  }

  function compareValues(spaceCharacter, value) {
    if (value === spaceCharacter) {
      setIsMatch(true)
      updateScore()
    } else {
      setIsMatch(false)
    }
  }

  function nextInput(e) {
    e.preventDefault();
    if (e.target.parentNode.nextSibling) {
      let next = e.target.parentNode.nextSibling.firstChild
      next.focus()
    } else {
      let nextBtn = document.getElementById("nextSentenceButton")
      nextBtn.style.visibility = 'visible';
      nextBtn.focus()
    }
  }


  return(
    <input className="spaceContainer"
      id={id}
      type="text"
      value={input}
      name="space"
      onChange={handleChange}
      onKeyUp={nextInput}
      style={isMatch ? {backgroundColor: "#4caf50"} : {backgroundColor: "#ffb74d"} }
      maxLength="1">
    </input>
  )
}
