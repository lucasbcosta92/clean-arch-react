import { faker } from '@faker-js/faker'

import { type SurveyModel } from '../models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.lorem.words(10),
  answers: [
    {
      answer: faker.lorem.words(4),
      image: faker.internet.url()
    },
    {
      answer: faker.lorem.words(8)
    }
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
