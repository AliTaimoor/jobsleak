'use client'
import React from 'react'
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from 'framer-motion'
import { cn } from "@/utils/cn";
import Typography from "../atomic/typography/Typography";

interface HorizontalScrollCarouselProps {
    children: React.ReactNode;

}

const HorizontalScrollCarousel = ({ children }: HorizontalScrollCarouselProps) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });


    const x = useTransform(scrollYProgress, [0, 1], ["35%", "-55%"]);
    console.log(x.get());
    return (
        <section ref={targetRef} className="relative h-[600vh]    ">
            <div className={cn(' sticky top-20  flex flex-col justify-center items-center gap-5 mb-6')}>
                <Typography type='h1' className='text-left lg:text-center font-fraunces max-w-[730px] !text-[64px] !leading-[72px] font-bold'>Recent Work</Typography>
            </div>

            <div className="sticky mt-80 top-1/3 flex  items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-6 ">
                    {children}
                </motion.div>
            </div>
        </section>
    );
};



export default HorizontalScrollCarousel;