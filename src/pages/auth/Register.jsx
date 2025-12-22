import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from "../../redux/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import { FaSun, FaMoon } from "react-icons/fa";
import { t } from 'i18next';

const Register = () => {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", motdepasse: "", role: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.motdepasse !== confirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    await dispatch(registerUser(form)).unwrap();
    navigate("/login");
  };

  const [showPassword, setShowPassword] = useState(false);
    
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [darkMode, setDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("darkMode");
      return savedTheme === "true"; 
  });

  const toggleDarkMode = () => {
      setDarkMode((prev) => {
          const newMode = !prev;
          localStorage.setItem("darkMode", newMode); 
          return newMode;
      });
  };
  
  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
  }, [darkMode]);

  return (
    <div className={`flex flex-col relative ${darkMode ? "dark" : ""}`}>
      <div 
        onClick={toggleDarkMode}
        className='w-full flex justify-end absolute cursor-pointer'>
        {darkMode? <FaSun className='w-6 h-6 mt-6 mr-8 dark:text-white'/> : <FaMoon className='w-6 h-6 mt-6 mr-8' /> }
      </div>
      <div className='grid w-full h-screen place-items-center md:bg-gray-100 dark:bg-gray-900'>
        <div className="flex w-full max-w-6xl bg-white dark:bg-gray-900 md:dark:bg-gray-800 md:shadow-[0_0_40px_3px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden">
          <div className='w-full md:w-1/2 px-20 pt-16 pb-10 flex flex-col justify-center'>
              <h2 className='text-3xl font-medium text-gray-800 dark:text-gray-100 mb-10 text-center'>{t("signup")}</h2>
    
              <form 
              onSubmit={handleSubmit}
              className='space-y-8'>
              
                <div className='space-y-6'>
    
                    <input
                      name='nom'
                      value={form.nom}
                      onChange={handleChange}
                      type="text"
                      placeholder={t("yourName")}
                      className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm  shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                      required
                    /> 
  
                    <input
                      name='prenom'
                      value={form.prenom}
                      onChange={handleChange}
                      type="text"
                      placeholder={t("yourFirstName")}
                      className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                      required
                    /> 
  
                    <input
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder={t("yourEmail")}
                      className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                      required
                    /> 
  
                  <div className="relative">
                    <input
                      name='motdepasse'
                      value={form.motdepasse}
                      onChange={handleChange}
                      type={ showPassword ? "text" : "password" }
                      placeholder={t("yourPassword")}
                      className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-100 dark:hover:text-gray-300 dark:bg-gray-600
                          dark:placeholder-white hover:text-gray-600 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                    
                  <div className="relative">
                    <input
                      name='ConfirmationModeDePasse'
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      type={ showPassword ? "text" : "password" }
                      placeholder={t("confirmPassword")}
                      className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                    {error && <p className="text-red-500 text-sm -my-4">{error}</p>}
                </div>
                    
                <div className="relative">
                  <select
                    name='role'
                    value={form.role}
                    onChange={handleChange}
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-fuchsia rounded-sm shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] appearance-none bg-white dark:bg-gray-600
                      dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer "
                  >
                    <option value="" disabled>{t("chooseRole")}</option>
                    <option value="client">{t("client")}</option>
                    <option value="partenaire">{t("partner")}</option>
                    <option value="personnelInterne">{t("internalStaff")}</option>
                    <option value="regisseurEquipementInterne">{t("equipmentManager")}</option>
                  </select>
                </div>
                    
                <div className='flex justify-center items-center'>
                  <button
                  type="submit"
                  className="flex space-x-2 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white 
                   bg-fuchsia hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md cursor-pointer"
                  >
                    <span>{t("register")}</span>
                  </button>
                </div>
                    
                <p className='flex justify-center items-center dark:text-gray-50'>
                  {t("alreadyAccount")}
                  <span  
                  onClick={() => navigate("/login")}
                  className='text-fuchsia hover:text-fuchsia cursor-pointer'>
                    {t("signIn")}
                  </span> 
                </p>
              </form>
                    
          </div>
                    
          <div className="hidden md:flex md:w-1/2 p-12 flex-col items-center justify-center text-center text-white 
                      bg-fuchsia relative">
                      
            <div className="absolute top-0 left-0 w-full h-full opacity-30 "></div>
                    
            <div className="z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t("welcome")}!
              </h3>
              <p className="text-lg mb-8">
                {t("welcomeDesc")}
              </p>
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-full 
                           hover:bg-white hover:text-fuchsia transition duration-300 backdrop-blur-sm cursor-pointer uppercase"
              >
                {t("login")}
              </button>
            </div>
          </div>
                    
        </div>
      </div>
    </div>
  )
}

export default Register