/* eslint-disable @typescript-eslint/no-unsafe-argument */

import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): any => {
  return {
    data: faker.string.sample(),
    status: faker.internet.httpStatusCode(),
    statusText: 'OK',
    headers: {},
    config: {
      url: ''
    }
  }
}

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
