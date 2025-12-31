import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePersonalInformation } from "../../redux/slices/user/userSlice";
import { logout, changePassword } from "../../redux/slices/auth/authSlice";
import { updateCurrentUser } from "../../redux/slices/auth/authSlice";
import { useTranslation } from "react-i18next";
import { LogOutIcon, EditIcon, CheckCheckIcon, X, Eye, EyeOff, Camera } from "lucide-react";
import { FaCamera } from "react-icons/fa";


export default function Profil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { id, role, photo, nom, prenom, email } = useSelector(state => state.auth.currentUser);
  const [isEditPI, setIsEditPI] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [formData, setFormData] = useState({
    nom,
    prenom,
    email
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    dispatch(
      changePassword({
        id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
    );
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="w-screen h-screen dark:bg-gray-900 dark:text-white flex justify-center items-center">
      <div className="flex gap-10 ">

        {/* Pofil */}
        <div className="flex flex-col justify-between bg-white dark:bg-gray-800 p-10 border border-gray-300 rounded-4xl">
          <div className="flex flex-col items-center relative">
            <div className="flex flex-col">
              <img 
                src={`http://localhost:3001${photo}`} 
                alt={photo} 
                className="size-55 object-cover rounded-full"
              />
              <div className="absolute bottom-32 right-2">
                <button className="dark:text-white focus:scale-90 cursor-pointer bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 p-2 rounded-full">
                  <FaCamera className="size-7" />
                </button>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mt-4">{nom}</h1>
            <h2 className="text-xl font-normal">{prenom}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">@{role}</p>
          </div>

          <div>
              <button 
                onClick={() => Logout()}
                className="
                  flex justify-center space-x-2 py-2 border border-transparent text-lg font-medium rounded-lg text-white cursor-pointer w-full
                  bg-fuchsia hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md
                "
              >
                < LogOutIcon />
                <span className="text-lg font-bold">{t("logout")}</span>
              </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-4xl">
          <div className="flex flex-col gap-15 p-15 pb-40">

            {/* Information personnel */}
            <form 
              onSubmit={handleUpdate}
              className="flex flex-col gap-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">{t("personalInformation")}</h1>
                {!isEditPI && (
                  <button
                    onClick={() => toggleEdit()}
                    className="flex gap-4 items-center bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    <EditIcon className="size-5" />
                    <span className="text-lg font-semibold">{t("edit")}</span>
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
                    {t("lastName")}
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
                    {t("firstName")}
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
                  {t("emailAddress")}
                </label>
              </div>
              

              {isEditPI && (
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex gap-2 items-center bg-fuchsia hover:bg-red-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <CheckCheckIcon className="size-6" />
                    <span className="text-lg font-semibold">{t("update")}</span>
                  </button>

                  <button
                    onClick={() => toggleEdit()}
                    className="flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <X className="size-6" />
                    <span className="text-lg font-semibold">{t("cancel")}</span>
                  </button>
                </div>
              )}
            </form>

            {/* Mot de passe */}
            <form 
              onSubmit={handleUpdatePassword}
              className="flex flex-col gap-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">{t("password")}</h1>

                {!isEditPassword && (
                  <button
                    onClick={() => toggleEditPassword()}
                    className="flex gap-4 items-center bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    <EditIcon className="size-5" />
                    <span className="text-lg font-semibold">{t("edit")}</span>
                  </button>
                )}
              </div>

              <div className="flex relative">
                <input 
                  required 
                  id="oldPassword"
                  type={ showPassword ? "text" : "password" }
                  disabled={!isEditPassword}
                  placeholder="Password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="
                    peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                    dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                  "
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 left-[530px] flex items-center text-gray-400  hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <label 
                  htmlFor="oldPassword"
                  className="
                    absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-gray-500
                    dark:peer-placeholder-shown:text-gray-400
                    peer-focus:text-fuchsia 
                    peer-focus:-top-3
                    peer-focus:text-sm
                  "
                >
                  {t("oldPassword")}
                </label>
              </div>

              <div className="flex gap-15">
                <div className="relative">
                  <input 
                    required
                    id="newPassword"
                    type={ showPassword1 ? "text" : "password" }
                    disabled={!isEditPassword}
                    placeholder="Password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility1}
                    className="absolute inset-y-0 left-[530px] flex items-center text-gray-400  hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                  >
                    {showPassword1 ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <label 
                    htmlFor="newPassword"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-3
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    {t("newPassword")}
                  </label>
                </div>

                <div className="relative">
                  <input 
                    required
                    id="confirmNewPassword"
                    type={ showPassword2 ? "text" : "password" }
                    disabled={!isEditPassword}
                    placeholder="Password"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="
                      peer px-4 py-2 w-xl text-lg outline-none border-2 border-gray-400 dark:border-gray-300 rounded-2xl hover:border-gray-600 
                      dark:hover:border-gray-400 duration-200 focus:border-fuchsia bg-inherit focus:outline-none placeholder-transparent
                    "
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility2}
                    className="absolute inset-y-0 left-[530px] flex items-center text-gray-400  hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                  >
                    {showPassword2 ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <label 
                    htmlFor="confirmNewPassword"
                    className="
                      absolute left-4 px-1 tracking-wide bg-white dark:bg-gray-800 -top-3 text-sm duration-300 pointer-events-none
                      peer-placeholder-shown:text-base
                      peer-placeholder-shown:top-3
                      peer-placeholder-shown:text-gray-500
                      dark:peer-placeholder-shown:text-gray-400
                      peer-focus:text-fuchsia 
                      peer-focus:-top-3
                      peer-focus:text-sm
                    "
                  >
                    {t("confirmNewPassword")}
                  </label>
                </div>
              </div>

              {isEditPassword && (
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex gap-2 items-center bg-fuchsia hover:bg-red-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <CheckCheckIcon className="size-6" />
                    <span className="text-lg font-semibold">{t("update")}</span>
                  </button>

                  <button
                    onClick={() => toggleEditPassword()}
                    className="flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white pr-4 p-2 rounded-lg cursor-pointer"
                  >
                    <X className="size-6" />
                    <span className="text-lg font-semibold">{t("cancel")}</span>
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
