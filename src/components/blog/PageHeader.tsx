import React from "react";
import Typography from "../atomic/typography/Typography";

export default function PageHeader() {
    return (
        <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5'>
            <Typography type="h1" className="font-black text-[32px] leading-[45px] lg:text-5xl" >Blogs</Typography>
            <Typography type="p" className="text-base text-neutral-600 font-normal lg:text-xl" >Read about the latest topics</Typography>
        </div>
    );
}