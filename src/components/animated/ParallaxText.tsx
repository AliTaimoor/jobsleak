import React from 'react'

interface ParallaxProps {
    children: React.ReactNode;
}

function ParallaxText({ children }: ParallaxProps) {

    return (
        <div className=" max-w-[800px] mx-auto  overflow-hidden w-full leading-[0.8]  flex  flex-nowrap"
            style={{
                mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",

            }}>
            <div className="animate-scroll w-max flex-nowrap flex  gap-16 m-0 p-0 ">
                {children}
                {children}
            </div>
        </div >
    );
}

export default ParallaxText;