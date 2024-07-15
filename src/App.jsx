import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './routes/Header'
import LandingPage from './routes/landingPage/LandingPage'
import Footer from './routes/Footer'
import BlogsPage from './routes/blogsPage/BlogsPage'
import ExpertsPage from './routes/expertsPage/ExpertsPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Header />
      <Outlet />
      <Footer />
    </div>,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "blogs",
        element: <BlogsPage />
      },
      {
        path: "experts",
        element: <ExpertsPage />
      }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
