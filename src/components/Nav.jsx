import React from 'react'
import { logo } from '../assets'
import { Link } from 'react-router-dom'


function Nav() {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="logo flex items-center gap-3">
          <img src= {logo} alt="" className='w-8'/>
          <h1 className='text-2xl font-bold'>Certify</h1>
        </div>
        

        <div className='flex gap-8 items-center'>
          <ul className='flex gap-4'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Features</li>
            <li className='cursor-pointer'>Pricing</li>
            <li className='cursor-pointer'>Contact us</li>
          </ul>  

          <Link to='/signup' className='rounded-2xl px-3 py-1'>Get Started</Link>
        </div>
        
      </nav>
    </div>
  )
}

export default Nav