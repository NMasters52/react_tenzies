import { useState, useEffect } from 'react'
import Dice from './Dice'
import './App.css'
import { v4 as uuidv4 } from 'uuid';





function App() {
  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const holdCount = dice.every(die => die.isHeld)
    const dieValue = dice[0].value
    const allSameValue = dice.every(die => die.value === dieValue)
    if (holdCount && allSameValue) {
      setTenzies(true)
      return console.log("you won")
    }
  }, [dice])
  
  
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

  return (
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice_container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
  )
}

export default App
