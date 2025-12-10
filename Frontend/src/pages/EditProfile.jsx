import React,{useState}  from "react";
import UserCard from '../components/UserCard'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from '../features/userSlice'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditProfile = () => {

  const userDetails = useSelector((state)=>state.user.userData)
  const dispatch = useDispatch();
  const navigate = useNavigate()

   const getUsers =async ()=>{
    if(userDetails) return ;
    const result = await axios.get(BASE_URL+"/api/profile/getProfile",{withCredentials:true})
    console.log(result.data ,"api call");
    dispatch(addUser(result.data))

  }

  useEffect(()=>{
    getUsers()

  },[userDetails])


  const user = useSelector((state)=>state.user.userData)

  console.log(user,"user dataaaaaa");
  const [firstName, setFirstname] = useState(user.firstName||"")
  const [lastName, setLastName] = useState(user.lastName||"")
  const [image, setImage] = useState(user.image||"")
  const [age, setAge] = useState(user.age || "")
  const [gender, setGender] = useState(user.gender||"");
  const [about, setAbout] = useState(user.about||"");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

   


  const saveProfile = async () => {
   
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/api/profile/createProfile",
        {
          firstName,
          lastName,
          image,
          age,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res,"response");
      dispatch(addUser(res.data));
      navigate('/profile')

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      // setError(error.response.data);
    }
  };

  return (
 
    <>
      <div className="flex justify-center  my-10 max ">
        <div className="flex justify-center mx-10 ">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">image url</span>
                  </div>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      {gender || "Select gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <button onClick={() => setGender("Male")}>Male</button>
                      </li>
                      <li>
                        <button onClick={() => setGender("Female")}>
                          Female
                        </button>
                      </li>
                      <li>
                        <button onClick={() => setGender("Others")}>
                          Others
                        </button>
                      </li>
                    </ul>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.split(","))}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500 text-center">{error}</p>
              <div className="card-actions justify-center mt-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;