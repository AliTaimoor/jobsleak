'use client'
import Avatar from '@/components/atomic/avatar/Avatar'
import Button from '@/components/atomic/button/Button'
import NotificationPanel from '@/components/molecules/notification-panel/NotificationPanel'
import React from 'react'

const NotificationsPage = () => {
    return (
        <div className='h-full min-h-[100vh] flex flex-col items-center justify-start gap-4'>
            <NotificationPanel
                title={<h1 className='font-bold'>Joy Pacheco mentioned you on Update tokens</h1>}
                description={<p>2h ago — Engineering</p>}
                avatar={<Avatar name='avatar' image='https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg' />}
            >
                <div className='flex justify-start gap-2 '>
                    <Button variant='primary' label='Approve' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                    <Button variant='secondary' label='Reject' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                </div>
            </NotificationPanel>
            <NotificationPanel
                title={<h1 className='font-bold'>Joy Pacheco mentioned you on Update tokens</h1>}
                description={<p>2h ago — Engineering</p>}
                avatar={<Avatar name='avatar' image='https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg' />}
            >
                <div className='flex justify-start gap-2 '>
                    <Button variant='primary' label='Approve' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                    <Button variant='secondary' label='Reject' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                </div>
            </NotificationPanel>
            <NotificationPanel
                title={<h1 className='font-bold'>Joy Pacheco mentioned you on Update tokens</h1>}
                description={<p>2h ago — Engineering</p>}
                avatar={<Avatar name='avatar' image='https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg' />}
            >
                <div className='flex justify-start gap-2 '>
                    <Button variant='primary' label='Approve' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                    <Button variant='secondary' label='Reject' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                </div>
            </NotificationPanel>
        </div>
    )
}

export default NotificationsPage