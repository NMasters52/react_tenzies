import { useState } from 'react'
import Dice from './Dice'
import './App.css'




function App() {
  const [dice, setDice] = useState(newDice())

  function newDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false})
    }

    return newDice
  }

  function rollDice() {
    setDice(newDice())
  }
  
  const diceElements = dice.map(die => <Dice value={die.value} />)

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
