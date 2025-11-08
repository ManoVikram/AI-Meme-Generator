"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const UnderlinedTextNavigationButton = ({ text, navigationRoutePath }) => {
    const router = useRouter()

    return (
        <button className='flex flex-col gap-1 cursor-pointer' onClick={() => navigationRoutePath && router.push(navigationRoutePath)}>
            <div className="flex flex-row justify-between items-center gap-2">
                <p>{text}</p>

                <Image src="/arrow-right.svg" alt='arrow-right' height={16} width={30} />
            </div>

            <div className="h-0.5 w-full bg-black" />
        </button>
    )
}

export default UnderlinedTextNavigationButton