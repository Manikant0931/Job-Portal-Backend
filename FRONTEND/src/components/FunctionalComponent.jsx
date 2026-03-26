import React, { useState } from 'react'

export default function FunctionalComponent({name, course}) {
    const [count, setcount] = useState(0)
    let increment = ()=>{
        setcount(count+1)
    }
  return (
    <div>
       <h2>Functional Component</h2>
       <p>{count}</p>
         <button onClick={increment}>+</button> 
    </div>
  )
}
