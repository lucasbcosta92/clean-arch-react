import './survey-item-styles.scss'

import React from 'react'

const SurveyItem: React.FC = () => (
  <li className='survey-item-wrap'>
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
)

export default SurveyItem
