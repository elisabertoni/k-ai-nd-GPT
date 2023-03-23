import { join } from 'node:path'
import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import welcome from './routes/welcome'
import request from 'superagent'
import chatgpt from './routes/chatgpt'

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)



server.get('/api/chat', async (req ,res) => {
  const response = await request.get('https://api.openai.com/v1/chat/completions')
  return response
})
server.use('/api/v1/gpt', chatgpt)

export default server