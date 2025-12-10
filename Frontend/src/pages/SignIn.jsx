import React from "react";
import {Link} from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";


const SignIn =  () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formdata,setFormData] = useState({})
  const [errorMsg,setErrorMsg]= useState("")
  const [type,setType] = useState("password")


  const togglePassword=()=>{
 
    if(type==="password"){
      
      setType("text")
    }
    else{

    
      setType("password")
    }
  }

  const handleChange=(event)=>{
    
      const {name,value} = event.target
      setFormData((prev)=>({
          ...prev ,[name]:value
      }))

      // console.log(formdata)
  
  }

//function to make an api call for signin

  const handleLogin = async (event) =>{
    event.preventDefault()

  try{

  const result =  await axios.post( BASE_URL+"/api/auth/signin",
    formdata,{withCredentials:true}
  )

  const userData = result.data.data;
  
    dispatch(addUser(userData))
   return navigate('/feed')
  
}
catch(error){
  
  if(error){
    setErrorMsg(error.response.data.message)
    
   return navigate('/signin')

}

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
      Sign in to your account
    </h1>

    <form onSubmit={handleLogin} className="space-y-6 ">

     
      <div className="text-black">
        <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
          Your email
        </label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          defaultValue={formdata.email}
          placeholder="name@company.com"
          required
          className=" text-black  w-full max-w-sm p-3 rounded-lg border-2 border-gray-300 
          focus:ring-4 focus:ring-slate-400/40 
          focus:border-slate-600 outline-none transition "
        />
      </div>

      <div className="relative text-black flex flex-row">
        <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
          Password
        </label>

        <input
          onChange={handleChange}
          type={type}
          name="password"
          placeholder="••••••••"
          required
          className="w-full max-w-sm p-3 pr-14 rounded-lg border-2 border-gray-900 "
          
         
        />

       <div className="bg-blue-950 cursor-pointer text-amber-100 w-20 p-2 ">
         <button className="text-center"
          type="button"
          onClick={togglePassword}
         
        >
          SHOW
        </button>
       </div>
      </div>

  
      {errorMsg &&(

       <p className="text-red-500 text-sm font-medium bg-red-100 py-2 rounded-lg mb-4">
  {errorMsg}
</p>
      )}

 
      <button
        type="submit"
        className=" cursor-pointer m-2 w-full max-w-sm bg-linear-to-r from-slate-700 to-slate-900 
        text-white py-3 rounded-lg font-bold text-md
        shadow-md hover:shadow-xl hover:scale-[1.02]
        transition-all duration-200 active:scale-95"
      >
        Sign in
      </button>


      <p className="text-sm text-gray-500 text-center">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-slate-800 font-bold hover:underline"
        >
          Signup here
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
  );
};

export default SignIn;
