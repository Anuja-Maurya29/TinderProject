import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
const [formdata,setFormData] = useState({})
const [type, setType] = useState("password")
const navigate = useNavigate();

const handleChange=(event)=>{
    const {name,value} = event.target
    setFormData((prev)=>({
        ...prev ,[name]:value
    }))

}

const handleSignUp= async (event)=>{
    event.preventDefault()

    const result  =await axios.post( BASE_URL+'/api/auth/signup',formdata,{withCredentials:true})
    console.log("jdshbcfb" , result);
    navigate('/feed')


}
console.log(formdata,"formdata");

const togglePassword = ()=>{

if(type==="password"){
  setType("text")
}
if(type==="text"){
  setType("password")
}

}


  return (
  <>
<section className="min-h-screen flex items-center justify-center bg-linear-to-r from-slate-500 to-slate-800 px-4">

 
  <div className="bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-6xl min-h-[700px] flex items-center justify-center">

    
    <div className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden grid md:grid-cols-2 w-full max-w-5xl min-h-[550px]">

      
    <div className="flex flex-col justify-center items-center p-10 w-full">


  <div className="w-full max-w-sm ">

 

 <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Create an account
            </h1>

          
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>

          
              <div className='text-black'>
                <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formdata.firstName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div className='text-black'>
                <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formdata.lastName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div className='text-black'>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  value={formdata.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>

    
              <div className='text-black flex'>
                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type={type}
                  name="password"
                  id="password"
                  value={formdata.password}
                  placeholder="••••••••"
                  className="w-full max-w-sm p-3 pr-14 rounded-lg border-2 border-gray-900 "
                  required
                />
               <div className='bg-blue-950 cursor-pointer text-amber-100 w-20 p-2 "'>
                 <button onClick={togglePassword}>Show</button>
               </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <label htmlFor="terms" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                  I accept the{" "}
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>

             
                <button
        type="submit"
        className=" cursor-pointer m-2 w-full max-w-sm bg-linear-to-r from-slate-700 to-slate-900 
        text-white py-3 rounded-lg font-bold text-md
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-200 active:scale-95"
      >
        Create an Account
      </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login here
                </Link>
              </p>

            </form>



  </div>
</div>


    
      <div className="hidden md:flex items-center justify-center bg-gray-100 p-10 border-l border-gray-300">
        <img
          src="src/assets/connection.jpg"
          alt="Login Visual"
          className="max-h-[400px] object-contain rounded-xl"
        />
      </div>

    </div>
  </div>
</section>
  
  </>
  )
}

export default SignUp