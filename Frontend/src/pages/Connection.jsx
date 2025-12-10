import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, removeConnection } from "../features/connectionSlice"

const Connections = () => {


  const dispatch = useDispatch();
  
  const fetchConnections = async () => {
  
    try {
       
      dispatch(removeConnection());
      const connectionsData = await axios.get(BASE_URL + "/api/user/getConnections", {
        withCredentials: true,
      });
      dispatch(addConnection(connectionsData.data.data));
        // console.log(connectionsData.data.data,"respomnse connection");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchConnections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connections = useSelector((state)=>state.connection.list)
  console.log(connections,"redux data");

  if (!connections) return;
  if (connections.length == 0)
  {
    return (
      <>
        <h1 className="flex justify-center text-2xl my-10 text-red-600">
          No conections found
        </h1>
      </>
    );
  }
 
 

  return (
<div className="text-center my-10">
  <h1 className="font-bold text-3xl text-pink-400 mb-6">
    Connections ({connections.length})
  </h1>


  <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {connections.map((connection) => {
      const firstName = connection.firstName;
      const lastName = connection.lastName;

      return (
        <div key={connection._id} className="p-4 rounded-xl bg-white shadow-lg border border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">
            {firstName + " " + lastName}
          </h2>
        </div>
      );
    })}
  </div>
</div>

  );
};

export default Connections;