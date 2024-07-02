'use client'
import React from 'react'
import Auth from '@/lib/auth/auth'
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth>
      {children}
    </Auth>
  )
}

export default AuthProvider
