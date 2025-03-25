export type SurverAnswerModel = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  question: string
  answers: SurverAnswerModel[]
  date: Date
  didAnswer: boolean
}
