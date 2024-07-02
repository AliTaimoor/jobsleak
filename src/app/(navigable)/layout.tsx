'use client'
import DashboardNavbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/navigation/Sidebar'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false)
  return (
    <AuthProvider>
      <div className='flex h-screen  text-black dark:text-white '>

        <Sidebar showMenu={showMenu} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden min-h-screen' >
          <DashboardNavbar onClick={() => setShowMenu(true)} />
          <main className='mx-auto w-full  bg-white dark:bg-black px-5 py-4   lg:px-12 ' onClick={() => setShowMenu(false)}>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider >
  )
}

export default Layout
