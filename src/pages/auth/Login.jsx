import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from "../../redux/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from "react-icons/fa";
import { LogIn as LogInIcon, Lock as LockIcon, Mail as MailIcon, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(form)).unwrap();
    
    const token = localStorage.getItem("token");
    if(token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin" || decoded.role === "regisseurEquipementInterne") {
        navigate("/adminDashboard");
      } else {
        navigate("/Equipements");
      }
    }
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
  
  const { t } = useTranslation();

  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
  }, [darkMode]);

  return (
    <div className={`flex flex-col relative ${darkMode ? "dark" : ""}`}>
      <div className='grid w-full h-screen place-items-center md:bg-gray-100 dark:bg-gray-900'>
        <div className="flex w-full max-w-6xl bg-white dark:bg-gray-900 md:dark:bg-gray-800 md:shadow-[0_0_40px_3px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden">
          <div className='w-full md:w-1/2 px-20 pt-40 pb-28 flex flex-col justify-center'>
              <h2 className='text-3xl font-medium text-gray-800 dark:text-gray-100 mb-14 -mt-10 text-center'>{t("login")}</h2>

              <form onSubmit={handleSubmit} className='space-y-10'>

                <div className='space-y-8'>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <MailIcon className="w-6 h-6 text-gray-400 dark:text-gray-100" />
                      <div className='ml-2 h-5 w-2 border-l-2 border-gray-400'></div>
                    </div>
                    <input
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      type="text"
                      placeholder={t("emailPlaceholder")}
                      className="w-full pl-16 pr-4 py-4 border-l-5 border-fuchsia rounded-sm shadow-[0_0_14px_3px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:ring-fuchsia transition duration-150"
                      required
                    /> 
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <LockIcon className="w-6 h-6 text-gray-400 dark:text-gray-100" />
                      <div className='ml-2 h-5 w-2 border-l-2 border-gray-400'></div>
                    </div>
                    <input
                      name='motdepasse'
                      value={form.motdepasse}
                      onChange={handleChange}
                      type={ showPassword ? "text" : "password" }
                      placeholder={t("passwordPlaceholder")}
                      className="w-full pl-16 pr-4 py-4 border-l-5 border-fuchsia rounded-sm shadow-[0_0_14px_3px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 dark:bg-gray-600
                          dark:placeholder-white dark:text-white focus:ring-fuchsia transition duration-150"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400  hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>


                <div className='flex justify-center items-center mt-12'>
                  <button
                  type="submit"
                  className="flex space-x-2 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white
                   bg-fuchsia hover:bg-red-600 dark:hover:bg-fuchsia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md cursor-pointer"
                  >
                    <LogInIcon className="w-5 h-5" />
                    <span>{t("connection")}</span>
                  </button>
                </div>

                <p className='flex justify-center items-center dark:text-gray-50'>
                  {t("noAccount")}
                  <span 
                   onClick={() => navigate("/register")}
                   className='text-fuchsia hover:text-fuchsia cursor-pointer'>
                    {t("signup")}
                  </span> 
                </p>
              </form>

          </div>

          <div className="hidden md:flex md:w-1/2 p-12 flex-col items-center justify-center text-center text-white 
              bg-fuchsia relative">
                      
            <div className="absolute top-0 left-0 w-full h-full opacity-30 "></div>
                    
            <div className="z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t("welcome")}
              </h3>
              <p className="text-lg mb-8 ">
                {t("welcomeDesc")}
              </p>
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-full 
                           hover:bg-white hover:text-fuchsia transition duration-300 backdrop-blur-sm cursor-pointer uppercase"
              >
                {t("signup")}
              </button>
            </div>
          </div>

        </div>
      </div>
      <div 
        onClick={toggleDarkMode}
        className='w-full flex justify-end absolute cursor-pointer'>
        {darkMode? <FaSun className='w-6 h-6 mt-6 mr-8 dark:text-white'/> : <FaMoon className='w-6 h-6 mt-6 mr-8' /> }
      </div>
    </div>
  )
}

