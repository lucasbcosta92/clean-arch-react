import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'

describe('SurveyItem', () => {
  test('should render with correct values', () => {
    const survey = mockSurveyModel()

    survey.didAnswer = true
    survey.date = new Date('2025-01-16T00:00:00')

    render(<SurveyItem survey={survey} />)

    expect(screen.getByTestId('status')).toHaveTextContent('Lido')
    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2025')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
