import { useState } from 'react'

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
        setPreviousMessages([...previousMessages, message, data.reply])
        setResponse(data.reply)
      })
      .finally(() => setMessage(''))
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
          className="textarea is-danger is-medium"
          value={previousMessages.map((elem) => `${elem}\n\n`)}
          placeholder=""
          rows={12}
        ></textarea>
        <input
          className="input is-danger is-medium"
          type="text"
          value={message}
          placeholder="Ask me anything ..."
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <div className="">
          <button className="button is-fullwidth is-danger mt-2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
