
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mode, setMode] = useState("moon")

    const handleMode = (type) => {
        setMode(type)

    }

    return (
        <>

            <div className="flex justify-around items-center p-4  bg-black ">
                <Link to={'/'}>
                    <span className='text-4xl font-bold cursor-pointer bg-gradient-to-r from-green-500 to-green-900 text-transparent bg-clip-text' >Product Store</span>
                </Link>
                <div className='flex gap-16 items-center'>
                    <Link to={'/create'}>
                        <button className='bg-green-700 p-3 rounded-md font-bold text-lg cursor-pointer'>Create Product</button>
                    </Link>
                    {mode === "moon" ? <Moon className='cursor-pointer' onClick={() => handleMode("sun")} /> : <Sun className='cursor-pointer' onClick={() => handleMode("moon")} />}

                </div>

            </div >

        </>
    )
}

export default Navbar
