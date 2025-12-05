import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    
    <>
   <footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-2 fixed bottom-0 w-full h-30 ">
  <div className="w-full max-w-7xl-xl mx-auto p-4 md:py-8 ">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <img src="src/assets/flame.jpg" className="h-7" alt="TechDating Logo" />
        <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">TechDating</span>
      </div>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
        <li>
          <Link to='/about' className="hover:underline me-4 md:me-6">About</Link>
        </li>
       
        <li>
          <Link to='/contact' className="hover:underline">Contact</Link>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
    <span className="block text-sm text-body sm:text-center">© 2023 <link href="/" className="hover:underline" />TechDating™. All Rights Reserved.</span>
  </div>
</footer>

    </>
  )
}

export default Footer