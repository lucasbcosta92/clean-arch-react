import './form-status-styles.scss'

import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state

  return (
    <div data-testid="form-status" className='form-status'>
      {isLoading && <Spinner />}
      {mainError && <span data-testid="main-error" className='error'>{mainError}</span>}
    </div>
  )
}

export default FormStatus
