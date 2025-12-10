import React from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({ user }) => {
    const navigate = useNavigate()

    const handleClick=()=>{
        
        navigate('/editProfile')
    }
  return (
    <>
<section
  id="profile"
  className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-6"
>
  <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

 
    <div className="h-40 bg-linear-to-r from-slate-700 to-slate-900"></div>

    <div className="px-8 md:px-16 pb-12 flex flex-col items-center text-center">

    {user.image &&(
        <div className="-mt-20 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
        <img
          src={BASE_URL + user.image}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
    )}

 
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        {user.firstName} {user.lastName}
      </h2>

    {user.profile &&(
       
      <p className="text-slate-700 font-medium mt-1">
        {user.profile}
      </p>

    )}
    
     
     {user.gender||user.age &&(
       <p className="text-gray-500 text-sm mt-1">
        {user.gender} • {user.age} years
      </p>
     )}

    {user.about &&(
       
      <div className="mt-8 max-w-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          About Me
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {user.about}
        </p>
      </div>
    )}
{user.skills &&(

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Skills
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm rounded-full 
              bg-slate-900 text-white shadow-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
)}

    
      <div className="mt-10 flex flex-col gap-2 text-center">
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">


  {user.linkdn && (
    <a
      href={user.linkdn}
      target="_blank"
      rel="noreferrer"
      className="
        flex items-center justify-center gap-2
        bg-blue-600 text-white
        px-6 py-2.5 rounded-full font-semibold
        shadow-md hover:shadow-xl hover:scale-105
        transition-all duration-300
      "
    >
      🔗 LinkedIn
    </a>
  )}


  {user.github && (
    <a
      href={user.github}
      target="_blank"
      rel="noreferrer"
      className="
        flex items-center justify-center gap-2
        bg-gray-900 text-white
        px-6 py-2.5 rounded-full font-semibold
        shadow-md hover:shadow-xl hover:scale-105
        transition-all duration-300
      "
    >
      💻 GitHub
    </a>
  )}

</div>

      </div>

     
      <button
        onClick={handleClick}
        className="mt-10 bg-linear-to-r from-slate-700 to-slate-900
        text-white px-10 py-3 rounded-full font-bold
        shadow-lg hover:shadow-xl hover:scale-105
        transition-all duration-300"
      >
        Edit Profile
      </button>

    </div>
  </div>
</section>




    </>
  );
};

export default ProfileCard;
