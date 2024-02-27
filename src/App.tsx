import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />{' '}
      {/* cada página tem um título %s */}
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
