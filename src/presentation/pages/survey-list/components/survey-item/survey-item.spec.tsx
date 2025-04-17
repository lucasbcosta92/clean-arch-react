import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2025-01-16T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('status')).toHaveTextContent('Lido')
    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2025')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2025-03-02T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('status')).toHaveTextContent('Não lido')
    expect(screen.getByTestId('day')).toHaveTextContent('02')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2025')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
