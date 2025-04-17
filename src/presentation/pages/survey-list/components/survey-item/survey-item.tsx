import './survey-item-styles.scss'

import React from 'react'

import { type SurveyModel } from '@/domain/models'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => (
  <li className='survey-item-wrap'>
    <div className='survey-content'>
      <span data-testid="status" className="status">
        {survey.didAnswer ? 'Lido' : 'Não lido'}
      </span>
      <time>
        <span data-testid="day" className='day'>
          {survey.date.getDate().toString().padStart(2, '0')}
        </span>
        <span data-testid="month" className='month'>
          {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
        </span>
        <span data-testid="year" className='year'>
          {survey.date.getFullYear()}
        </span>
      </time>
      <p data-testid="question">{survey.question}</p>
    </div>
    <footer>Ver resultado</footer>
  </li>
)

export default SurveyItem
