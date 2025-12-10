import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import ProfileCard from "../components/ProfileCard";


const Profile = () => {
  const user = useSelector((store) => store.user.userData);
  console.log(user,"userData");

  return (
    user && (
      <div>
        {/* <EditProfile user={user} /> */}
        <ProfileCard user={user}/>
      </div>
    )
  );
};

export default Profile;