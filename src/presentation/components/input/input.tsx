/* eslint-disable react/prop-types */
import './input-styles.scss'

import React, { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)

  const inputRef = useRef<HTMLInputElement>()

  const inputName = props.name
  const placeholder = props.placeholder
  const error = state[`${inputName}Error`]

  return (
    <div
      className='input-wrapper'
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${inputName}-wrapper`}
    >
      <input
        {...props}
        data-testid={inputName}
        placeholder=' '
        ref={inputRef}
        title={error}
        onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <label
        data-testid={`${inputName}-label`}
        title={error}
        onClick={() => { inputRef.current.focus() }}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
