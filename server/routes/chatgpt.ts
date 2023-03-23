import { Configuration, OpenAIApi } from 'openai'
import express from 'express'

import { RequestCompletion } from '../../models/request'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const configuration = new Configuration({
  organization: process.env.ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
}

//  GET /api/v1/gpt/chat
router.get('/chat', async (req, res) => {
  const model: RequestCompletion = {
    model: 'text-davinci-003',
    prompt: 'how are you today',
    max_tokens: 7,
    temperature: 0,
  }
  try {
    const response = await openai.createCompletion(model, headers)
    res.send(response.data.choices[0].text)
  } catch (err) {
    res.status(500).send(err != null && (err as Error).message)
  }
})

export default router
