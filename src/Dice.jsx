import React from 'react'

export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" style={styles}>
            <h2 className="die-count">{props.value}</h2>
        </div>
    )
}