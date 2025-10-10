import React, { useState } from "react";
import { FiEye, FiEyeOff, FiHeart } from "react-icons/fi";
import { FaFacebookF, FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    alert("Signed in (demo) — replace with actual authentication");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Background header section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-cyan-500 pt-12 pb-6">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative z-10 text-center text-white">
          <a href="#" className="inline-block text-xl font-bold tracking-tight">
            <span className="inline-block bg-white/10 px-3 py-1 rounded">Velzon</span>
          </a>
          <p className="mt-3 text-sm opacity-90">Premium Admin & Dashboard Template</p>
        </div>
        <div className="mt-6">
          <svg viewBox="0 0 1440 120" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 -mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="text-center">
                    <h5 className="text-indigo-600 text-lg font-semibold">Welcome Back!</h5>
                    <p className="text-sm text-gray-500 mt-1">Sign in to continue to Dashboard.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <a href="#" className="text-xs text-indigo-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative mt-1">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="block w-full rounded-md border border-gray-200 px-3 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>


                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-medium rounded-md py-2 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="text-center text-sm text-gray-500">
          <p className="inline-flex items-center gap-2">
            &copy; {new Date().getFullYear()} Velzon. Crafted with <FiHeart className="text-red-500" /> by Themesbrand
          </p>
        </div>
      </footer>
    </div>
  );
}