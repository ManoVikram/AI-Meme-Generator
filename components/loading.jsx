"use client"

import Lottie from 'lottie-react'
import React from 'react'
import loadingAnimation from '../public/loadingLottie.json'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-120 w-120">
            <Lottie animationData={loadingAnimation} loop />
        </div>
    )
}

export default Loading