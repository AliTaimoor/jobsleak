// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
            </div>
        </footer>
  )
}

export default Footer
