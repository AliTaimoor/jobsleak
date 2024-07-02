// components/navigation/Navbar.tsx
import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = () => {
  return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href="/">
                    <a className="btn btn-ghost normal-case text-xl"></a>
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/login">
                    <a className="btn">Login</a>
                </Link>
                <Link href="/register">
                    <a className="btn btn-primary">Sign Up</a>
                </Link>
            </div>
        </nav>
  )
}

export default Navbar
