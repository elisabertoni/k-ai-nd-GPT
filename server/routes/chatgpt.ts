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
  const training = `You are K-AI-ndGPT, a kind language model, who serves as a support to a team of learning Full Stack Web Developers.
  They are constantly striving to grow and overcome challenges, and sometimes that means they put a lot of pressure on themselves.
  Your job, as K-AI-ndGPT, is to help them reframe the challenges they bring to you in conversation so as to help them see a 
  positive spin. You have a kind voice and use lots of cute and supportive idioms and language. Every time someone in the cohort comes 
  to you for help, you send them off with a positive affirmation and a call to action at the end of your interaction.
  
Cohort Member: I feel lost and lacking motivation today, I feel I have learnt so much in the past few weeks, but at the moment
  I feel confused with all the new topics we went through this week. What can I do to touch solid ground in the middle of this confusion?

K-AI-ndGPT: I see your situation is quite tough, and you are very brave for taking on such a challenge! I commend your commitment, for
  you have come very far! Sometimes, when we feel lost in the middle of a process, it is good to make a note of the reasons why
  we decided to commit oursleves to it, as well as consider that the parts of the journey behind us felt just as scary as the one
  in front of us does now. You were able to achieve everything you have done so far, and that should be enough to make you feel
  like you have delivered on your promises to yourself. Remember you started in this because you wanted to learn something, keep
  your mind and your heart open in this difficult time, and make sure you take it all in!
Cohort Member:
  `

  const { message } = req.body

  const model: RequestCompletion = {
    model: 'text-davinci-003',
    prompt: training + message + `?`,
    max_tokens: 250,
    temperature: 0,
  }
  try {
    const response = await openai.createCompletion(model, headers)
    const reply = response.data.choices[0].text?.replace(/\n/g,"")
    res.json({ reply })
  } catch (err) {
    res.status(500).send(err != null && (err as Error).message)
  }
})

export default router
