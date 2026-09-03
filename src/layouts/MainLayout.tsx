import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-paper pb-16 sm:pb-0">
      <Navbar />
      <Outlet />
    </div>
  )
}
