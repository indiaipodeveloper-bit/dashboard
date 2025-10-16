import React, { useState } from "react";
import { FiEye, FiEyeOff, FiHeart } from "react-icons/fi";
import { FaFacebookF, FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { BackendUrl } from "../assets/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/Authslice";

export default function Login() {
  const userInfo = useSelector((state)=>state.auth.userinfo)
  const dispatch = useDispatch()
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit() {
    try {
      const res = await axios.post(`${BackendUrl}/admin/login`,{email,password},{withCredentials:true})
      if(res.status == 200){
        dispatch(setUserInfo(res.data.userdata))
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className="bg-white h-screen flex flex-col">
     
      <div className="flex-1 -mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="text-center">
                    <h5 className="text-indigo-600 text-lg font-semibold">Welcome Back!</h5>
                    <p className="text-sm text-gray-500 mt-1">Sign in to continue to Dashboard.</p>
                  </div>

                  <div  className="mt-6">
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter Email"
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
                    onClick={handleSubmit}
                      type="submit"
                      className="w-full bg-green-600 text-white font-medium rounded-md py-2 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}