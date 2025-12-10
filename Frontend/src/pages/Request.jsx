import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../features/requestSlice"
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const result = await axios.post(
        BASE_URL + "/api/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(result,"review request");
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };


  const fetchRequests = async () => {
    try {
      const connectionRequests = await axios.get(BASE_URL + "/api/user/getAllRequest", {
        withCredentials: true,
      });
      // console.log(connectionRequests.data.data, "apiiii requests data");
      const userData = connectionRequests.data.data
      console.log(userData,"userDataaa");
      dispatch(addRequests(userData));
     
    }
     catch (error) {
      console.log(error.message);
    }
  };
  

  useEffect(() => {
    fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const requests = useSelector((state) => state.request.list);
  console.log(requests,"request redux data");

  if (!requests) return;
  if (requests.length === 0)
    return (
      <>
        <h1 className="flex justify-center text-2xl my-10 text-green-300">
          No Requests found
        </h1>
      </>
    );

  return (
   
    <div className=" text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400 p-4">
        Requests ({requests.length})
      </h1>
      {requests?.map((request) => {
        const { _id, firstName, lastName} = request.fromUser;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
          >
           
            <div className="text-left m-4 p-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
            
            </div>
            <div className="">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;