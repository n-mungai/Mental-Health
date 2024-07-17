import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './routes/Header'
import LandingPage from './routes/landingPage/LandingPage'
import Footer from './routes/Footer'
import BlogsPage from './routes/blogsPage/BlogsPage'
import ExpertsPage from './routes/expertsPage/ExpertsPage'
import BlogDetails from './routes/blogDetailsPage/BlogDetails'
import UploadBlogPage from './routes/uploadBlogPage/UploadBlogPage'

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
        children: [
          {
            path: "",
            element: <BlogsPage />,
          },
          {
            path: ":blogId",
            element: <BlogDetails />
          }
        ]
      },
      {
        path: "experts",
        element: <ExpertsPage />
      },
      {
        path: "user",
        element: <UploadBlogPage />
      },
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
