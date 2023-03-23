export interface RequestCompletion {
  model: string
  prompt: string
  max_tokens: number
  temperature: number
}

export interface RequestChatCompletion {
  model: string
  messages: Message[]
}

export interface Message {
  role: string
  content: string
}
