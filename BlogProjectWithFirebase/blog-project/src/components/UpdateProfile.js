import React, { useState } from "react";
import { update, auth, resetPassword} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const {user} =useSelector(state => state.auth)
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [password, setPassword] = useState("");
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({ displayName});
    dispatch(login(auth.currentUser));
    
   
  };
   const passwordHandle = async (e) => {
    e.preventDefault()
     const res = await resetPassword(password);
     if(res){
      resetPassword("");
     }
   }
  return (
   <div className=" container mx-auto py-8"> 
   <h1 className="text-2xl font-bold mb-6 text-center">Update Your Profile</h1>
     <form onSubmit={handleSubmit} className="grid gap-y-4 py-4 max-w-xl mx-auto">
     
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
         Change your name
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
      </div>
      <div>
        <button
        disabled={!displayName}
        className="inline-flex justify-center items-center w-full px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white cursor-pointer disabled:opacity-60"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
    <form onSubmit={passwordHandle} className="grid gap-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Change your password
        </label>
        <div className="mt-1">
          <input
            type="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>
      </div>
      <div>
        <button
        disabled={!password}
        className="inline-flex justify-center items-center w-full px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white cursor-pointer disabled:opacity-60"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
   </div>
   
  );
};

export default UpdateProfile;
