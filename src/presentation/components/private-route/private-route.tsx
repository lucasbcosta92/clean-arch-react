import React from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return <Navigate to="/login" />
}

export default PrivateRoute
