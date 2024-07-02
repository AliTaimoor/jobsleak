import MinusIcon from '@/icons/MinusIcon'
import PlusIcon from '@/icons/PlusIcon'
import { motion, AnimatePresence } from 'framer-motion';

import React from 'react'

interface FaqItemProps {
    question: string
    answer: string
    isOpen?: boolean
    onClick?: () => void
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
    return (
        <div className='container  bg-white dark:bg-gray-700 text-faq-color dark:text-white dark:bg-input-dark  font-normal text-[18px] leading-[32px] rounded-[8px] shadow-sm '>
            <motion.div
                initial={false}
                animate={{
                    // backgroundColor: showAnswer ? "white" : "gray",
                }}
                onClick={onClick}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                }}
                className='w-full py-4 px-6'
            >
                <h3 className='word-break'>{question}</h3>
                {isOpen ? <div className='' ><MinusIcon /> </div> : <div><PlusIcon /></div>}
            </motion.div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        // Add animations for the accordion content
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { height: "initial", opacity: 1 },
                            collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.15 }}

                    >
                        <div
                            className='bg-[#FAFAFA]  dark:bg-faq-answer-dark py-4 px-6 '
                        >
                            {answer}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>

    )
}

export default FaqItem