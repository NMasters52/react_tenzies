import { useState, useEffect } from 'react'
import Dice from './Dice'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Confetti from "./Confetti"





function App() {
  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
 

  

  useEffect(() => {
    const holdCount = dice.every(die => die.isHeld)
    const dieValue = dice[0].value
    const allSameValue = dice.every(die => die.value === dieValue)
    if (holdCount && allSameValue) {
      setTenzies(true)
    }
  }, [dice])


  function newGame() {
     setTenzies(false) 
     setDice(oldDice => oldDice.map(die => ({
      value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: uuidv4()
     })))
     setCount(0)
  }
  
  
  function newDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ 
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: uuidv4()
      })
    }
    return newDice
  }
  
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: uuidv4()
          }
      })
    )
    setCount(oldCount => ++oldCount)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => (
    <Dice 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  const confettiEffect = tenzies && <Confetti /> 



  return (
      <main>
        <div>
          {confettiEffect}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice_container">
          {diceElements}
        </div>
        <div>
          {tenzies && <h4 className ="roll-count">It took you {count} rolls!</h4>}
        </div>
        <button className="roll-dice" onClick={tenzies ? newGame : rollDice }>{tenzies ? "New Game" : "Roll"}</button>
      </main>
  )
}

export default App
