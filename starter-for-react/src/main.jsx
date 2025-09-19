import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import  store  from '../src/store/store.js'
import { Provider} from 'react-redux'
import {  createBrowserRouter , RouterProvider } from 'react-router'
import Home from './components/pages/Home.jsx'
// import { AuthLayout , Login ,  } from './Components/index.jsx'
import Login from './Components/Login.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import AddPost from './Components/pages/AddPost.jsx'
import Signup from './Components/pages/Signup.jsx'
import EditPost from './Components/pages/EditPost.jsx'
import Post from './Components/pages/Post.jsx'
import AllPost from './Components/pages/AllPost.jsx'
import Contact from './Components/pages/Contact.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",   // ✅ fixed
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",  // ✅ consistent
        element: (
          <AuthLayout authentication={true}>
            <AllPost />
          </AuthLayout>
        ),
      },
   {
  path: '/create-post',  // ✅ leading slash
  element: (
    <AuthLayout authentication={true}>
      <AddPost />
    </AuthLayout>
  )
},
      {
        path: "/edit-post/:slug",  // ✅ dynamic slug
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
      {
        path: "/contact",
        element: <Contact />,
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
