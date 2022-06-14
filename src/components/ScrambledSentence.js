import {useEffect, useState} from 'react';

export default function ScrambledSentence(props) {
  const { sentence } = props

  const [scrambledLine, setScrambledLine] = useState(sentence)

  useEffect(() => {
    scrambleLine(sentence)
  }, [sentence])

  function scrambleLine(sentence) {
    let temp = null
    let newArray = []

    let array = sentence.split(' ')
    let i = 0
    let j = 0

    array.forEach(word => {
      if (word.length <= 3) {
        newArray.push(word)
      }
      else if (word.length > 3){
        let wordArray = word.split('')
        let fLetter = wordArray.shift()
        let lLetter = wordArray.pop()

        for (i = wordArray.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = wordArray[i]
            wordArray[i] = wordArray[j]
            wordArray[j] = temp
          }
        let newWordArray = [fLetter + wordArray.join("") + lLetter]
        newArray.push(newWordArray.toString())
      }
    });
    let outputSentence = newArray.join(" ")
    setScrambledLine(outputSentence)
  }

  return (
    <div id="scrambledSentence">
      <h1>{scrambledLine}</h1>
    </div>
  )
}
