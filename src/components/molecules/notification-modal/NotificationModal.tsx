import Avatar from '@/components/atomic/avatar/Avatar';
import { cn } from '@/utils/cn';
import React from 'react'
import NotificationPanel from '../notification-panel/NotificationPanel';
import Button from '@/components/atomic/button/Button';
import Notification from '@/lib/models/notification';
import Divider from '@/components/atomic/divider/Divider';




interface NotificationModalProps {
    notifications: Notification[]
    shown: boolean;
}


const NotificationModal = ({ notifications, shown }: NotificationModalProps) => {
    return (
        <div className={cn('flex flex-col  shadow-lg justify-center items-center  border  border-grey-200 dark:border-profile-modal-border-dark dark:bg-profile-modal-background-dark rounded-lg  content duration-150 ease-in-out absolute top-12 bg-white right-0', { "hidden": !shown })}>
            {notifications.map((notification, index) => (
                <>
                    <NotificationPanel
                        title={<h1 className='text-sm font-normal dark:text-white'><span className='font-bold'>{notification.name}</span> requests accesss to <span className='font-bold'>{notification.action}</span></h1>}
                        description={<p className=' text-sm font-normal dark:text-sidebar-icon-dark'>{notification.time} ago -  {notification.topic}</p>}
                        avatar={<Avatar size='md' image={notification.image} name={notification.name} />}
                    >
                        <div className='flex justify-start gap-2 '>
                            <Button variant='primary' label='Approve' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                            <Button variant='secondary' label='Reject' size='sm' className='!w-fit !min-w-fit' onClick={() => { }} />
                        </div>
                    </NotificationPanel>
                    {index !== notifications.length - 1 && <Divider dividerType='horizontal' dividerStyle='light' />}
                </>

            ))}
        </div>
    )
}

export default NotificationModal