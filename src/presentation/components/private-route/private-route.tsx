import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  element: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? element : <Navigate to="/login" />
}

export default PrivateRoute
