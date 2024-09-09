import React from 'react'

export default function Dice(props){
    return (
        <div className="die">
            <h2 className="die-count">{props.value}</h2>
        </div>
    )
}