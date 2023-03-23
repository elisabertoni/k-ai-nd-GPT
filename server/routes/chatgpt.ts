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

//  POST /api/v1/gpt/chat

// params: /chat/tell me something funny
// query params: /chat?text=tell me something funny
// POST body: { message: 'tell me something funny' }

router.post('/chat', async (req, res) => {
  const training = `You are a kind language model, who serves as a support to a team of learning Full Stack Web Developers.
  `
   
  const { message } = req.body
  
  const model: RequestCompletion = {
    model: 'text-davinci-003',
    prompt: message,
    max_tokens: 200,
    temperature: 0,
  }
  try {
    const response = await openai.createCompletion(model, headers)
    console.log({reply: response.data.choices[0].text})
    res.json({reply: response.data.choices[0].text})
  } catch (err) {
    res.status(500).send(err != null && (err as Error).message)
  }
})

export default router
