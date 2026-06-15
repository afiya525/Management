import React from 'react'

export default function SearchBar({name,setName}) {
    
  return (
    <div>
        <input type="text" placeholder='PID or Patients Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        
    </div>
  )
}
 
