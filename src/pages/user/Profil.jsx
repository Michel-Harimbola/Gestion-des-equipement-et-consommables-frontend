import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePersonalInformation } from "../../redux/slices/user/userSlice";
import { logout } from "../../redux/slices/auth/authSlice";
import { updateCurrentUser } from "../../redux/slices/auth/authSlice";
import { LogOutIcon, EditIcon, CheckCheckIcon, X } from "lucide-react";

export default function Profil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, role, photo, nom, prenom, email } = useSelector(state => state.auth.currentUser);
  const [isEditPI, setIsEditPI] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [formData, setFormData] = useState({
    nom,
    prenom,
    email
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const resultAction = await dispatch(
      updatePersonalInformation({
        id,
        data: formData
      })
    );

    if (updatePersonalInformation.fulfilled.match(resultAction)) {
      dispatch(updateCurrentUser(resultAction.payload));
      setIsEditPI(false);
    }
  } catch (err) {
    console.error(err);
  }
};

  const toggleEdit = () => {
    setIsEditPI(!isEditPI);
    setIsEditPassword(false);
  }

  const toggleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
    setIsEditPI(false);
  }

  const Logout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900 dark:text-white flex justify-center items-center">
      <div className="flex gap-10 ">

        {/* Pofil */}
        <div className="flex flex-col justify-between bg-white dark:bg-gray-800 p-10 rounded-4xl">
          <div className="flex flex-col items-center">
            <img 
              src={`http://localhost:3000${photo}`} 
              alt={photo} 
              className="size-55 rounded-full"
            />
            <h1 className="text-2xl font-semibold mt-4">{nom}</h1>
            <h2 className="text-xl font-normal">{prenom}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">@{role}</p>
          </div>

          <div>
              <button 
                onClick={() => Logout()}
                className="flex gap-4 w-full justify-center bg-fuchsia hover:bg-red-600 text-white rounded-xl py-2 cursor-pointer"
              >
                < LogOutIcon />
                <span className="text-lg font-bold">Log Out</span>
              </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-4xl">
          <div className="flex flex-col gap-15 p-15 pb-40">

            {/* Information personnel */}
            <form 
              onSubmit={handleUpdate}
              className="flex flex-col gap-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Personal Information</h1>
                {!isEditPI && (
                  <button
                    onClick={() => toggleEdit()}
                    className="flex gap-4 items-center bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    <EditIcon className="size-5" />
                    <span className="text-lg font-semibold">Edit</span>
                  </button>
                )}
              </div>
              <div className="flex gap-15">
                <div className="relative">
                  <input 
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    disabled={!isEditPI}
                    id="nom"
                    type="text" 
                    placeholder="nom"
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <label 
                    htmlFor="nom"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-2
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    First Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    disabled={!isEditPI}
                    id="prenom"
                    type="text" 
                    placeholder="prenom"
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <label 
                    htmlFor="prenom"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-2
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    Last Name
                  </label>
                </div>
              </div>
             
              <div className="flex relative">
                <input 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditPI}
                  id="email"
                  placeholder="email"
                  className="
                    peer px-4 py-2 w-[1212px] text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                    dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                  "
                />
                <label 
                  htmlFor="email"
                  className="
                    absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-gray-500
                    dark:peer-placeholder-shown:text-gray-400
                    peer-focus:text-fuchsia 
                    peer-focus:-top-3
                    peer-focus:text-sm
                  "
                >
                  Email address
                </label>
              </div>
              

              {isEditPI && (
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex gap-2 items-center bg-fuchsia hover:bg-red-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <CheckCheckIcon className="size-6" />
                    <span className="text-lg font-semibold">Update</span>
                  </button>

                  <button
                    onClick={() => toggleEdit()}
                    className="flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <X className="size-6" />
                    <span className="text-lg font-semibold">Cancel</span>
                  </button>
                </div>
              )}
            </form>

            {/* Mot de passe */}
            <form className="flex flex-col gap-10">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Password</h1>

                {!isEditPassword && (
                  <button
                    onClick={() => toggleEditPassword()}
                    className="flex gap-4 items-center bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    <EditIcon className="size-5" />
                    <span className="text-lg font-semibold">Edit</span>
                  </button>
                )}
              </div>

              <div className="flex relative">
                <input 
                  required
                  id="oldPassword"
                  type="password" 
                  placeholder="Password"
                  className="
                    peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                    dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                  "
                />
                <label 
                  htmlFor="oldPassword"
                  className="
                    absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-gray-500
                    dark:peer-placeholder-shown:text-gray-400
                    peer-focus:text-fuchsia 
                    peer-focus:-top-3
                    peer-focus:text-sm
                  "
                >
                  Old password
                </label>
              </div>

              <div className="flex gap-15">
                <div className="relative">
                  <input 
                    required
                    id="newPassword"
                    type="password" 
                    placeholder="Password"
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <label 
                    htmlFor="newPassword"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-2
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    New password
                  </label>
                </div>

                <div className="relative">
                  <input 
                    required
                    id="confirmNewPassword"
                    type="password" 
                    placeholder="Password"
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <label 
                    htmlFor="confirmNewPassword"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-2
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    Confirm new password
                  </label>
                </div>
              </div>

              {isEditPassword && (
                <div className="flex gap-4">
                  <button
                    className="flex gap-2 items-center bg-fuchsia hover:bg-red-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <CheckCheckIcon className="size-6" />
                    <span className="text-lg font-semibold">Update</span>
                  </button>

                  <button
                    onClick={() => toggleEditPassword()}
                    className="flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <X className="size-6" />
                    <span className="text-lg font-semibold">Cancel</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
