import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  user: any
  redirectTo?: string
}

export default function ProtectedRoute({ children, user, redirectTo = '/' }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}