import './signup-styles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'

import { type AddAccount } from '@/domain/use-cases'
import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  addAccount: AddAccount
  validation: Validation
}

const Signup: React.FC<Props> = ({ addAccount, validation }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    emailError: '',
    name: '',
    nameError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    password: '',
    passwordError: '',
    mainError: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setState({ ...state, isLoading: true })

      if (state.isLoading || state.isFormInvalid) {
        return
      }

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  useEffect(() => {
    const { email, name, passwordConfirmation, password } = state
    const formData = { email, name, passwordConfirmation, password }

    const emailError = validation.validate('email', formData)
    const nameError = validation.validate('name', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      nameError,
      passwordConfirmationError,
      passwordError,
      isFormInvalid: !!emailError || !!nameError || !!passwordConfirmationError || !!passwordError
    })
  }, [state.email, state.name, state.passwordConfirmation, state.password])

  return (
    <div className='signup-wrap'>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className='form' onSubmit={(event) => { void handleSubmit(event) }}>
          <h2>Criar conta</h2>
          <Input type="text" name='name' placeholder='Digite seu nome' />
          <Input type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <Input type="password" name='passwordConfirmation' placeholder='Repita sua senha' />
          <SubmitButton text='Criar conta' />
          <Link to="/login" data-testid="login-link" className='link'>Voltar para login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Signup
