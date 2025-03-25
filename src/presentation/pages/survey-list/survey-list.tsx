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
          <li>
            <div className='survey-content'>
              <span className="status">Lido</span>
              <time>
                <span className='day'>27</span>
                <span className='month'>01</span>
                <span className='year'>2025</span>
              </time>
              <p>Como vc refatora seus codigos?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>

          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
