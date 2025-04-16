import './survey-list-styles.scss'

import React from 'react'

import { Footer, Header } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className='survey-list-wrap'>
      <Header />
      <div className='content-wrap'>
        <h2>Enquetes</h2>
        <ul>

        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
