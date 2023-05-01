import { join } from 'node:path'
import express from 'express'
import cors from 'cors'

import chatgpt from './routes/chatgpt'

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/gpt', chatgpt)

export default server
