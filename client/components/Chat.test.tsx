import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import { sendMessage } from '../apiClient'
import * as Models from '../../models/request'

jest.mock('../apiClient')

import Chat from './Chat'

describe('<Chat />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const message: Models.Message = {
    role: 'user',
    content: 'You are doing ok',
  }
  const requestChatCompletion: Models.RequestChatCompletion = {
    model: 'davinci model something',
    messages: [message],
  }

  it('should show a submit button', async () => {
    jest.mocked(sendMessage).mockResolvedValue(requestChatCompletion)
    render(<Chat />)

    expect(screen.getByRole('button').getAttribute('type')).toContain('submit')
  })
})
