import React, { useState } from "react";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    navigate("/", {
      replace: true,
    });
  };
  return (
    <div class="container mx-auto py-8">
      <h1 class="text-2xl font-bold mb-6 text-center">Join Us!</h1>{" "}
      <form
        onSubmit={handleSubmit}
        className="grid gap-y-4 py-4 max-w-xl mx-auto"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            E-mail
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={email}
              placeholder="blog@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="inline-flex justify-center items-center w-full px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white cursor-pointer disabled:opacity-60"
            disabled={!email || !password}
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
