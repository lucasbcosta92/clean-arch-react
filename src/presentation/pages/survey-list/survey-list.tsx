import './survey-list-styles.scss'

import React, { useEffect } from 'react'

import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import { type LoadSurveyList } from '@/domain/use-cases'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () { loadSurveyList.loadAll() })()
  }, [])

  return (
    <div className='survey-list-wrap'>
      <Header />
      <div className='content-wrap'>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
