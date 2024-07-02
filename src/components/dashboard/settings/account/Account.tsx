import React from 'react'
import EditProfile from '@/containers/edit-profile/EditProfile'
import EditPassword from '@/containers/edit-profile/EditPassword'
const AccountSettings = () => {
    return (
        <div className='container mx-auto w-full max-w-[1200px] py-8 grid grid-cols-12 gap-8 justify-items-center align-top min-h-screen'>
            <div className='col-span-12 md:col-span-6 w-full'>
                <EditProfile />
            </div>
            <div className='col-span-12 md:col-span-6 w-full'>
                <EditPassword />
            </div>
        </div >
    )
}

export default AccountSettings