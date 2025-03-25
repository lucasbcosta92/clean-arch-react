import './login-styles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'

import { type Authentication } from '@/domain/use-cases'
import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  authentication: Authentication
  validation: Validation
}

const Login: React.FC<Props> = ({ authentication, validation }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
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
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  return (
    <div className='login-wrap'>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className='form' onSubmit={(event) => { void handleSubmit(event) }}>
          <h2>Login</h2>
          <Input title="email" type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <SubmitButton text='Entrar' />
          <Link data-testid="signup-link" to="/signup" className='link'>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
