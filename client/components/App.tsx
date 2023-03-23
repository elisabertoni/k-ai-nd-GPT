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
    <div className='columns'>
        <div className='column'></div>
        <div className='column is-half'>
          <h1 className='has-text-centered is-size-2 mt-4'>{welcomeStatement}</h1>
          <h2 className='has-text-centered is-size-6 mb-4'>Kind Gestures Powered by Tech</h2>
          <Chat/>
        </div>
        <div className='column'>
          <img className='mt-6 pr-2' src='./bmo-gif.gif' alt='bmo pic' />
        </div>
    </div>
    <div>
      <footer className='has-text-centered m-4 p-4'>
        <div>&copy; BMO 2023</div>
        <div>Full Disclaimer: This website does not provide medical advice.</div>
      </footer>
    </div>
    </>
  )
}

export default App
