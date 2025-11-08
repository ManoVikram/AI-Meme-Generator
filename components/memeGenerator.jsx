"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Loading from './loading';
import { generateMeme } from '@/lib/api/helpers';

const MemeGenerator = () => {
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [memeData, setMemeData] = useState(null);

    const handleGenerateMeme = async () => {
        setIsLoading(true)

        const memeData = await generateMeme(topic)
        setMemeData(memeData)

        setIsLoading(false)
    }

    const copyMemeToClipboard = async () => {
        if (memeData && memeData.image) {
            const memeImage = await fetch(memeData.image)
            const memeBlob = await memeImage.blob()

            await navigator.clipboard.write([new ClipboardItem({
                [memeBlob.type]: memeBlob
            })])
        }
    }

    return (
        <section className='flex flex-col flex-1 justify-start items-center h-full w-full gap-10 py-10'>
            {isLoading ? (
                <div className="flex flex-1 justify-center items-center">
                    <Loading />
                </div>
            ) : memeData ? (
                <div className="relative flex flex-col flex-1 justify-center h-[70vh] w-2/3 items-center gap-6">
                    <div className="flex justify-center items-center max-h-[50vh] w-full pointer-events-none">
                        <Image src={memeData.image} alt='meme-image' height={1024} width={1024} className='object-contain max-h-[50vh] w-auto hover:scale-[1.02] hover:drop-shadow-xl transition-all duration-200 cursor-pointer pointer-events-auto' onClick={copyMemeToClipboard} />
                    </div>

                    <p className="italic text-gray-400 w-2/3 text-center">{memeData.caption}</p>
                </div>
            ) : (
                < div className={`flex flex-col flex-1 justify-start items-center gap-10`}>
                    <div className="flex flex-row justify-center items-center w-full">
                        <div className="relative aspect-4/5 w-48 bg-white p-1 rounded-xl">
                            <div className="relative size-full">
                                <Image src="/generated_image_1.png" alt='generated-image-1' fill className='object-cover rounded-lg' />
                            </div>
                        </div>

                        <div className="relative aspect-4/5 w-48 -ml-7 -rotate-6 bg-white p-1 rounded-xl">
                            <div className="relative size-full">
                                <Image src="/generated_image_2.png" alt='generated-image-2' fill className='object-cover rounded-lg' />
                            </div>
                        </div>

                        <div className="relative aspect-4/5 w-48 -ml-5 rotate-6 bg-white p-1 rounded-xl">
                            <div className="relative size-full">
                                <Image src="/generated_image_3.png" alt='generated-image-3' fill className='object-cover rounded-lg' />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center w-2/3 gap-1">
                        <h3 className='text-xl'>Meme</h3>

                        <p className='text-gray-400 text-center'>Drop your meme topic in the prompt box below and start creating</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col justify-between items-center w-2/3 bg-white rounded-xl px-4 py-3 gap-4">
                <input type="text" value={topic} placeholder='Drop your meme topic' className='w-full ring-0 outline-0' onChange={(event) => setTopic(event.target.value)} />

                <button className='flex justify-between items-center gap-1 bg-black rounded-full text-white px-4 py-2 w-fit -mb-7 cursor-pointer' onClick={handleGenerateMeme}>
                    <Image src="/sparkle-icon.svg" alt='sparkle-icon' height={20} width={20} />

                    <p>Generate</p>
                </button>
            </div>
        </section >
    )
}

export default MemeGenerator