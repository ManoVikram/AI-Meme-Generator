import Image from 'next/image'
import React from 'react'
import UnderlinedTextNavigationButton from './underlinedTextNavigationButton'

const Hero = () => {
    return (
        <section className='pt-10 h-[80vh] w-full'>
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col justify-between items-start h-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center items-center w-fit px-5 py-8 gap-3 bg-black">
                            <div className="relative aspect-4/5 w-32">
                                <Image src="/generated_image_1.png" alt='generated-image-1' fill className='object-cover' />
                            </div>

                            <div className="relative aspect-4/5 w-32">
                                <Image src="/generated_image_3.png" alt='generated-image-2' fill className='object-cover' />
                            </div>
                        </div>

                        <p className='text-lg'>Memelab Showreels</p>
                    </div>

                    <p className='text-5xl w-2/3'>Send in an idea. Get a meme back in seconds. Crisp, funny, ready to share anywhere.</p>
                </div>

                <div className="flex flex-col justify-between items-start pl-36 h-full">
                    <h1 className=' text-8xl font-bold'>WE MAKE MEMES THAT HIT DIFFERENT</h1>

                    <div className="flex flex-row justify-between items-center w-full">
                        <UnderlinedTextNavigationButton text="About us" />

                        <UnderlinedTextNavigationButton text="Generate meme" navigationRoutePath="/generate-meme" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero