"use client"

import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react'

const PageTransition = ({ children }) => {
    const pathName = usePathname();
    const overlayRef = useRef(null);

    useEffect(() => {
        const node = overlayRef.current;
        if (!node) return;

        gsap.fromTo(
            node,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );

        return () => {
            if (!node) return;
            gsap.to(node, {
                opacity: 0,
                x: -10,
                duration: 0.8,
                ease: "power2.out",
            });
        };
    }, [pathName]);

    return (
        <main ref={overlayRef} className='flex flex-col flex-1'>
            {children}
        </main>
    )
}

export default PageTransition