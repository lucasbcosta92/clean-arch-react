import './login-header-styles.scss'

import React, { memo } from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className='header-wrap'>
      <h1>Clean Arch</h1>
    </header>
  )
}

export default memo(LoginHeader)
