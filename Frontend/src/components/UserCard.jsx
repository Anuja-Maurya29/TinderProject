
import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../features/feedSlice"

const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, image, skills } =
    user;

  console.log("Extracted Skills:", skills); // Debugging

  const handleSendRequest = async (status, toUser) => {
    try {
      const result = await axios.post(
        
        BASE_URL + "/api/request/send/" + status + "/" + toUser,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(result,"removed user");
      dispatch(removeUserFromFeed(toUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card grid-rows-1 bg-base-300 w-96 shadow-xl p-3">
      <figure>
        <img src={BASE_URL+image} alt="userProfile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {about&& <p>{about}</p>}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-accent"
            onClick={() => {
              handleSendRequest("ignore", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("intrested", _id);
            }}
          >
            Intrested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
