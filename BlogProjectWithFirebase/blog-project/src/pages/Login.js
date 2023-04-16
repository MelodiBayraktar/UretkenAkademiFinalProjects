import React, { useState } from "react";
import { login } from "../firebase";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  };
  return (
    <>
      <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Welcome Back!</h1>
        <form
          onSubmit={handleSubmit}
          className="grid gap-y-4 py-4 max-w-xl mx-auto"
        >
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
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
              class="block text-gray-700 text-sm font-bold mb-2"
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
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
