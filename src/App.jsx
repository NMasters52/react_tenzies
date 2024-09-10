import { useState } from 'react'
import Dice from './Dice'
import './App.css'
import { useId } from 'react';




function App() {
  const [dice, setDice] = useState(newDice())

  function newDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ 
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: useId()
      })
    }
    console.log(newDice)
    return newDice
  }
  

  function rollDice() {
    setDice(newDice())
  }
  
  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} />)

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
