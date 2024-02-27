import { createBrowserRouter } from 'react-router-dom'

import { ConfirmEmail } from './components/confirm-email'
import { NewPassword } from './components/new-password'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/change-password',
        element: <ConfirmEmail />,
      },
      {
        path: '/change-password/new-password',
        element: <NewPassword />,
      },
    ],
  },
])
