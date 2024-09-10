import { useState } from 'react'
import Dice from './Dice'
import './App.css'
import { v4 as uuidv4 } from 'uuid';





function App() {
  const [dice, setDice] = useState(newDice())
  
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
    setDice(newDice())
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
        <div className="dice_container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
  )
}

export default App
