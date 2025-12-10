import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import{Link,Outlet,useLocation, useNavigate }from  'react-router-dom'
import background from '../assets/background/mainPage.jpg'
import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../features/userSlice'
import { useEffect } from 'react'



const Home = () => {
const location = useLocation()
const isHome = location.pathname==='/'
const dispatch = useDispatch()
const navigate  = useNavigate();
const userData = useSelector((state)=>state.user.userData)


const isLoggedInUser = async ()=>{
  if(userData)return;
 try{
   
  const userData = await axios.get(BASE_URL+"/api/profile/getProfile",{withCredentials:true})
  dispatch(addUser(userData.data))


 }
 catch(error){
  if(error.response.status===500){
    return navigate('/signin')
  }

 }
}

useEffect(()=>{

  isLoggedInUser()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
 <>
 <div  className="min-h-screen flex flex-col"
        style={{
          backgroundImage: isHome ? `url(${background})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
>   
    <NavBar/>
  {
    isHome &&(
       <div  className="flex-1 flex flex-col justify-center items-center text-center gap-6 bg-black/50">
      <h1 className='className="text-5xl md:text-8xl font-extrabold text-white tracking-wide drop-shadow-lg"'>Let's Connect</h1>
      <Link to='/signup'><button className="bg-red-500 hover:bg-red-600 transition text-white rounded-full px-8 py-3 text-lg shadow-lg">Create Account</button></Link>
    </div> 
    )
  }

    <div className='h-180'>
      <Outlet/>
    </div>
<div className=' shrink-0'>
      <Footer/>
</div>

</div>
 </>
  )
}

export default Home

{/* <div className='m-100'>
     <h1>Let's Connect</h1>
 <Link to ='/signup'><button className='bg-red-500 text-white  rounded-3xl '>Create Account</button></Link>
</div> */}