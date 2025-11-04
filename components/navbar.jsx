import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full py-4'>
            <div className="flex flex-row justify-between items-center">
                <h4 className='text-3xl'>Memelab</h4>

                <ul className='flex flex-row gap-14 text-lg'>
                    <li className='cursor-pointer'>Create</li>
                    <li className='cursor-pointer'>Services</li>
                    <li className='cursor-pointer'>About</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar