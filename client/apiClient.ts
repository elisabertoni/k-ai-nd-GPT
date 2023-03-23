import request from 'superagent'
import { RequestChatCompletion } from '../models/request'

const serverURL = 'http://localhost:3000/api/v1'

interface Welcome {
  statement: string
}

// *** EXAMPLE ***
export function getWelcome(): Promise<Welcome> {
  return request.get(`${serverURL}/welcome`).then((response) => response.body)
}
// ***   ***   ***

//  GET /gpt/chat/:text
export function sendMessage(): Promise<RequestChatCompletion> {
  return request
    .get(`${serverURL}/gpt/chat`)
    .then((response) => response.body.reply)
}
