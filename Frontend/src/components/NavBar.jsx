

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../features/userSlice'


const NavBar = () => {

const user = useSelector((state)=>state.user.userData)
// console.log(user,"userinfo");
const navigate = useNavigate()
const dispatch = useDispatch()

const handleLogout =async()=>{
  try{
const response = await axios.post(BASE_URL+"/api/auth/logout",{},
  {withCredentials:true}
)

console.log(response);
dispatch(removeUser())
navigate('/signin')
  }
  catch(error){
    console.log(error);

  }
  

}

  return (
   <>

  <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1 flex items-center gap-3">
    <img
      src="src/assets/flame.jpg"
      alt="logo"
      className="w-10 h-10 object-cover rounded-full mx-5"
    />
    <span className="text-xl font-bold">TechDating</span>
  </div> 

  <div className="flex gap-2 ">

  <Link to='/'><button className='cursor-pointer'>Home</button></Link>
  <Link to='/feed'><button className='cursor-pointer'>Explore</button></Link>
   
<Link to='/signin'><button className='cursor-pointer'>{user?"Logout":"login"}</button></Link>
{
  user &&(
    <div className="dropdown dropdown-end mx-5 flex gap-6">
      <p>Welcome {user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       
           <div className="w-10 rounded-full">
          {user.image ?(
           <img
            alt="Profile Image"
            src={BASE_URL+ user.image}
          />
          ):
           <img
            alt="Profile Image"
            src="src/assets/dummy.png"
          />
          }
        </div>
        

        
      </div>

      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to='/requests' className="justify-between">
            Requests
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to='/connections' className="justify-between">
            Friends
            <span className="badge">New</span>
          </Link>
        </li>
       
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

  )
}
    
  </div>
</div>
   </>
  )
}

export default NavBar