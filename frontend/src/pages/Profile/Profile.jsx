import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { BackendUrl } from "../../assets/constant";
import { setUserInfo } from "../../redux/slices/Authslice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userinfo);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState(null);
  const [hovered, sethovered] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.image) {
      setimage(`${BackendUrl}/${user.image}`);
    }
  }, [user]);

  const saveChanges = async () => {
    try {
      const res = await axios.post(
        `${BackendUrl}/admin/update-profile`,
        { name, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(
          setUserInfo({
            ...user,
            name: res.data.user.name,
            image: res.data.user.image,
          })
        );
        toast.success("Profile Updated");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      try {
        if (file) {
          const formdata = new FormData();
          formdata.append("profile-image", file);
          const res = await axios.post(
            `${BackendUrl}/admin/add-profile-image`,
            formdata,
            {
              withCredentials: true,
            }
          );
          if (res.status == 200 && res.data.image) {
            dispatch(setUserInfo(res.data.user));
            toast.success("Image Updated Successfully");
          }

          const reader = new FileReader();
          reader.onload = () => {
            setimage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    },
    [user]
  );

  const handleDeleteImage = async () => {
    const res = await axios.get(`${BackendUrl}/admin/remove-profile-image`, {
      withCredentials: true,
    });
    if (res.status == 200) {
      dispatch(setUserInfo(res.data.user));
      setimage(null);
    }
  };

  return (
    <div className="bg-[#1a1d21] mt-10 h-1/2 flex items-center justify-center gap-10 flex-col">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div className="flex justify-center flex-wrap gap-5">
          <div
            className="w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => {
              sethovered(true);
            }}
            onMouseLeave={() => {
              sethovered(false);
            }}
          >
            <Avatar className="h-32 w-32 md:w-48  md:h-48 rounded-full border-[1px] overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile imgage"
                  className="object-cover w-full h-full bg-cover bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl text-white flex items-center justify-center rounded-full`}
                >
                  {name ? name.split("").shift() : user.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer ring-fuchsia-50"
                onClick={(e) => {
                  !image && handleFileInputClick();
                }}
              >
                {image ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className={"w-full h-full"}>
                        <FaTrash className="text-white text-3xl m-auto cursor-pointer" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure to Delete the Image ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your image from the
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className={"cursor-pointer"}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteImage} className={"bg-red-500  hover:bg-red-400 cursor-pointer"}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              name="profile-image"
              accept=".png ,.jpg , .jpeg , .svg , .webp"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </div>
          <div className="flex min-w-32  md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Enter your email here"
                type="email"
                disabled
                value={user.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="User Name"
                type="text"
                value={name}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Enter New Password"
                type="text"
                value={password}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <Button
          className="h-16 cursor-pointer rounded-full w-full bg-purple-700 hover:bg-purple-900 text-white font-bold transition-all duration-300"
          onClick={() => {
            saveChanges();
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
