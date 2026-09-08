
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import './index.css'
import Login from './pages/Login/Login'

import Feed from './pages/Feed/Feed'
import Notfound from './pages/Notfound/Notfound'
import Regester from './pages/regester/Regester'
import MyPosts from './pages/myPosts/myPosts'
import { Toaster } from 'react-hot-toast'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/profile/Profile'
import Notification from './pages/Notification/Notification'
import PostDetails from './pages/postDetails/postDetails'
import Setting from './pages/setting/setting'
import AppProtactedRoutes from './lib/protactedRoutes/appprotactedRoutes'
import AuthProtactedRoute from './lib/protactedRoutes/AuthProtactedRoute'
import Community from './pages/Community/Community'

function App() {

const router = createBrowserRouter([
    {
      path: "/auth", element:<AuthProtactedRoute> <AuthLayout/></AuthProtactedRoute> , children: [
        { index: true, element: <Regester /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Regester /> },
      ]
    },
    {
      path: "", element: <AppProtactedRoutes>< MainLayout/></AppProtactedRoutes>, children: [
        { index: true, element: <Feed /> },
        { path: "/feed", element: <Feed /> },
        { path: "/Community", element: <Community /> },
        { path: "/myPosts", element: <MyPosts /> },
        { path: "/profile", element: <Profile /> },
        { path: "/notification", element: <Notification /> },
        { path: "/settings", element: <Setting /> },
        { path: "/postDetails/:postId", element: <PostDetails /> },
      ]
    },
    { path: "*", element: <Notfound /> }


  ])

  return (
    <>
    <Toaster/>
    <RouterProvider  router={router} />
    </>
  )
}

export default App
