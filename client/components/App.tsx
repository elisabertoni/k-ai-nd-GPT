import { useState, useEffect } from 'react'
import { getWelcome } from '../apiClient'
import Chat from './Chat'

function App() {
  const [welcomeStatement, setWelcomeStatement] = useState('')

  useEffect(() => {
    getWelcome()
      .then((res) => {
        setWelcomeStatement(res.statement)
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  
  return (
    <>
    <h1>{welcomeStatement}</h1>
    <Chat/>
    </>
  )
}

export default App
