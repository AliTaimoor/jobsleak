// components/Alert.tsx
import React from 'react'

interface AlertProps {
  type: 'error' | 'warning' | 'info'
  message: string
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const typeClasses = {
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  }

  return (
        <div className={`alert ${typeClasses[type]}`}>
            <div>
                <span>{message}</span>
            </div>
        </div>
  )
}

export default Alert
