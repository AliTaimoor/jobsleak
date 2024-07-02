'use client'
import React from 'react'
import { useChat } from 'ai/react'


import { useLocalStorage } from '@/hooks/useLocalStorage'

import { usePathname } from 'next/navigation'
import customToast from '../atomic/toast/customToast'
import { Message } from 'ai'
import UserIcon from '@/icons/user-icon.svg'
import ChatGptIcon from '@/icons/chatgpt.svg'
import InputField from '../atomic/input/InputField'
export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

function Chat({ id, initialMessages }: ChatProps) {
    const path = usePathname()
    const [previewToken,] = useLocalStorage<string | null>(
        'ai-token',
        null
    )
    const { messages, input, handleSubmit, handleInputChange } =
        useChat({
            initialMessages,
            id,
            body: {
                id,
                previewToken
            },
            onResponse(response) {
                if (response.status === 401) {
                    customToast.error(response.statusText)
                }
            },
            onFinish() {
                if (!path.includes('chat')) {
                    window.history.pushState({}, '', `/chat/${id}`)
                }
            }
        })
    return (
        <>
            <div className="flex flex-col w-full max-w-lg py-24 mx-auto items-start gap-4">
                {messages.map(m => (
                    <div key={m.id} className="whitespace-pre-wrap grid grid-cols-12 gap-4 justify-start">
                        <div className='col-span-2 w-full'>
                            {m.role === 'user' ? <UserIcon /> : <ChatGptIcon />}
                        </div>
                        <div className='col-span-10 flex text-left'>
                            {m.content}
                        </div>
                    </div>
                ))}

                <form onSubmit={handleSubmit}>
                    <InputField
                        name='message'
                        id='message'
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />

                </form>
            </div>
        </>
    )
}
export default Chat;