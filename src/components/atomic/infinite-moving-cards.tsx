"use client";

import React from "react";
import CompanyLogo1 from '@/icons/company-icons/logo-ipsum1.svg'
import CompanyLogo2 from '@/icons/company-icons/logo-ipsum2.svg'
import CompanyLogo3 from '@/icons/company-icons/logo-ipsum3.svg'
import ParallaxText from "../animated/ParallaxText";
const items = [
    CompanyLogo1, CompanyLogo2, CompanyLogo3
]
export const InfiniteMovingCards = () => {
    return (
        <ParallaxText >
            {items.map((Item, idx) => (
                <Item key={idx} />
            ))}
        </ParallaxText>

    );
};
