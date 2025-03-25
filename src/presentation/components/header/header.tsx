import './header-styles.scss'

import React, { memo } from 'react'

const Header: React.FC = () => {
  return (
    <header className='header-wrap'>
      <div className='header-content'>
        <div className='logout-wrap'>
          <span>Lucas</span>
          <a href='#'>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
