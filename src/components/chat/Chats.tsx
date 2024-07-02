'use client'
import { Chat } from '@prisma/client'
import React from 'react'
import InputField from '../atomic/input/InputField'
import { useMutation } from '@tanstack/react-query'
import customToast from '../atomic/toast/customToast'
import { useRouter } from 'next/navigation'
import DeleteIcon from "@/icons/trash-icon.svg"
import { deleteChat } from '@/app/actions'
import Button from '../atomic/button/Button'
interface ChatsProps {
    chats: Chat[]
}
const Chats = ({ chats }: ChatsProps) => {
    const [pageChats, setPageChats] = React.useState<Chat[]>(chats)
    const [chatTitle, setChatTitle] = React.useState('')
    const router = useRouter()
    const addChatMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/chat/new', {
                method: 'POST',
                body: JSON.stringify({ chatTitle }),
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            })
            if (!response.ok) {
                if (response.status === 400 || response.status === 429) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
            }
            return response.json()
        },
        onSuccess: (data) => {
            router.push(`/chat/${data.data.id}`)
            customToast.success("New chat initiated")
        },
        onError: (error) => {
            customToast.error(error.message)
        }
    })
    const createChat = async () => {
        await addChatMutation.mutateAsync()
    }
    return (
        <div className='relative w-full '>
            <div className='grid grid-cols-12 gap-x-2 gap-y-4'>

                {pageChats.map((chat) => (
                    <div className='chat relative card w-92  h-92  bg-base-100 col-span-3 shadow-md rounded-md hover:cursor-pointer hover:shadow-xl' key={chat.id} onClick={() => { router.push(`/chat/${chat.id}`) }}>
                        <div className='card-body '>
                            <h1 className='card-title w-32'>{chat.title}</h1>
                            <div className='absolute top-4 right-2 text-red-700' onClick={async (e) => {
                                e.stopPropagation()
                                await deleteChat(chat.id)
                                setPageChats(pageChats.filter((c) => c.id !== chat.id))
                                customToast.success("Chat deleted")
                            }}>
                                <DeleteIcon />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=' flex mt-16 fixed bottom-2 gap-4 justify-start mx-auto w-["inherit"]  '>
                <InputField id='chat-title' name='chat-title' onChange={(e) => { setChatTitle(e.target.value) }} value={chatTitle} />
                <Button onClick={createChat} label='Create Chat' size='lg' variant='primary' />
            </div>
        </div>
    )
}

export default Chats