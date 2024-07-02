// components/Modal.tsx
import React, { useEffect } from 'react'
import Button from '@/components/atomic/button/Button'
import CrossIcon from "@/icons/cross-icon.svg"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode | string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [onClose])

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  return (
    <dialog className={`modal  ${isOpen ? "modal-open" : ""} `} onClick={handleClick}>
      <div className="modal-box  sm:max-w-[320px] bg-white dark:bg-card-dark min-w-[300px] md:max-w-[448px] lg:max-w-[576px] !p-0 !m-0 ">
        <form method='dialog'>
          <Button onClick={onClose} variant='secondary' size='sm' icon={<CrossIcon />} className='absolute !w-fit !p-2 !min-w-fit  right-6 top-2' />
        </form>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
