'use client';
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
type AnimationType = "scroll" | "opacity" | "scroll-opacity"

interface AnimatedSectionProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    delay?: number
    type?: AnimationType
}


const AnimatedSection = ({ children, delay, type = "scroll-opacity", ...aditionalProps }: AnimatedSectionProps) => {
    const ref = useRef<HTMLDivElement>(null)
    let variants = null;
    switch (type) {
        case "scroll-opacity":
            variants = {
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: delay || 0,
                    }
                },
                hidden: {
                    y: 30,
                    opacity: 0,
                }
            }
            break;
        case "opacity":
            variants = {
                visible: {
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: delay || 0,
                    }
                },
                hidden: {
                    opacity: 0,
                }
            }
            break;
        default:
            variants = {
                visible: {
                    y: 0,
                    transition: {
                        duration: 0.1,
                        ease: 'easeInOut',
                        delay: delay || 0,
                    }
                },
                hidden: {
                    y: 100,
                }
            }
            break;
    }

    const controls = useAnimation();
    const inView = useInView(ref);
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
    return (
        <motion.div
            // @ts-expect-error ref is not assignable to string
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            {...aditionalProps}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedSection