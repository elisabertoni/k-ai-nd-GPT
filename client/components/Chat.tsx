import { useState } from 'react'
import request from 'superagent'
// fetch, superagent, axios

export default function Chat() {
  // { text: string, author: 'me' | 'gpt', id: number, timestamp: number }
  const [previousMessages, setPreviousMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // request.post('/api/v1/gpt/chat').set('Content-Type', 'application/json').send({ message }).then((response) => {
    //   setResponse(response.body.reply)
    // })

    // fetch(url, options)
    fetch('http://localhost:3000/api/v1/gpt/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPreviousMessages([...previousMessages, message])
        setResponse(data.reply)
      })
      .catch((err) => {
        console.log(err)
        setError('Something went wrong, come back soon!')
      })
  }

  if (error) {
    return <div>{error}</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea is-primary is-medium"
          value={message}
          placeholder="Ask me anything ..."
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className='button is-primary is-left' type="submit">Submit</button>
      </form>
      {JSON.stringify(response, null, 2)}
    </div>
  )
}
