import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, addBlog, deleteBlog } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    await addBlog({
      blog,
      uid: user.uid,
    });
    setBlog("");
  };

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
  };
  if (user) {
    return (
      <div className="container mx-auto py-20 ">
        <h1 className="text-2xl font-bold mb-3 text-center">
          Welcome {user.displayName}
          <div className="font-light mt-2 text-lg ">({user.email})</div>
        </h1>

        <div className=" flex py-4 gap-x-4 max-w-l mx-auto ">
          <Link
            to="/settings"
            className="w-1/2 text-center rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
          >
            Settings
          </Link>{" "}
          <button
            onClick={handleLogout}
            className="w-1/2 text-center rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
          >
            Log Out
          </button>
        </div>
        <form className="flex gap-x-2" onSubmit={submitHandle}>
          <textarea
            onChange={(e) => setBlog(e.target.value)}
            type="text"
            value={blog}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none h-40"
            placeholder="Write your blog..."
          />
          <button
            disabled={!blog}
            className="inline-flex justify-center items-center  px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white cursor-pointer disabled:opacity-60"
          >
            Add
          </button>
        </form>

        <ul className="mt-4">
          {blogs.map((blog) => (
            <li
              className="mt-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-indigo-400 text-white flex justify-between items-center"
              key={blog.id}
            >
              {blog.blog}
              <button
                onClick={() => {
                  handleDelete(blog.id);
                }}
                className="h-7 rounded px-3 ml-3 test-xs bg-gradient-to-br from-[#6025F5] to-[#FF5555] text-white"
              >
                Delete
              </button>
            </li>
          ))}
          {blogs.length === 0 && (
            <li className="mt-4 shadow-sm  md:text-md w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-pink-700 text-white text-center">This place is empty!</li>
          )}
        </ul>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-xl font-bold text-navy-700 text-center">
        Welcome to Blog App
      </h1>

      <div className="grid gap-y-4 py-4 max-w-xl mx-auto">
        <Link
          to="/register"
          className="text-center rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
        >
          Sign In
        </Link>

        <Link
          to="/login"
          className="text-center rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
        >
          Log In
        </Link>
      </div>

      <p className="font-normal text-navy-700 mt-4 mx-auto w-max">
        Please Sign In or Log In
      </p>
    </div>
  );
};

export default Home;
