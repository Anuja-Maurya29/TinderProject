import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    
    <>


<footer className="  fixed-bottom bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
  <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between gap-1.5">
      <div>
        <link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" />
      <img src="src/assets/flame.jpg" className="w-20 h-20" alt="TechDating  Logo" />
      </div>
      <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">TechDating</span>
      <ul className="flex flex-wrap items-center gap-1 mb-6 text-sm font-medium text-body sm:mb-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" className="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
    <hr className="my-8  w-lvw border-default  sm:mx-auto lg:my-8" />
    <span className="block text-sm text-body sm:text-center">© 2023 <Link to =''className="hover:underline">TechDating™</Link>. All Rights Reserved.</span>
  </div>
</footer>



    </>
  )
}

export default Footer