import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { setUserInfo } from "../../redux/slices/Authslice";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status == 200) {
        dispatch(setUserInfo(res.data.userdata));
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3e3a4b] px-4 py-8 bg-img-div">
      <div className="w-full max-w-xl relative rounded-2xl flex justify-center items-center h-[70%]
                      before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-gradient-to-tr 
                      before:from-purple-400 before:to-indigo-500 before:pointer-events-none
                      shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2">

        <div className="w-[90%] h-[90%] flex justify-center items-center rounded-2xl 
                        border border-white/10 shadow-inner hover:shadow-xl transition-transform duration-500 transform hover:scale-105 relative">

          <div className="w-full h-[90%] max-w-md m-auto rounded-2xl shadow-2xl p-6 sm:p-10 text-white 
                          bg-white/5 backdrop-blur-3xl  outline-white/20">
            <div className="text-center mb-8">
              <div className="text-3xl font-semibold mb-2">Welcome back Admin</div>
            </div>

            <div className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1d21] text-white focus:outline-none focus:ring-2 focus:ring-[#9b8cff] placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1d21] text-white focus:outline-none focus:ring-2 focus:ring-[#9b8cff] placeholder-gray-400 text-sm sm:text-base"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="hover:underline cursor-pointer">Forgot password?</div>
              </div>

              <div
                onClick={handleSubmit}
                className="w-full bg-[#9b8cff] text-white py-3 rounded-lg font-medium text-center hover:bg-[#8b7fe0] transition cursor-pointer"
              >
                Log in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
