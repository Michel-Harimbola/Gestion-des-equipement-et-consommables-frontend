import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LogIn as LogInIcon, Lock as LockIcon, Mail as MailIcon, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Login successful!");
      navigate("/Menu");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='grid w-full h-screen place-items-center bg-gray-100'>
      <div className="flex w-full max-w-6xl bg-white shadow-[0_0_50px_5px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden">
        <Toaster position='top-right' />
        <div className='w-full md:w-1/2 px-20 pt-40 pb-28 flex flex-col justify-center'>
            <h2 className='text-3xl font-medium text-gray-800 mb-14 -mt-10 text-center'>Se connexion</h2>

            <form onSubmit={handleSubmit} className='space-y-10'>

              <div className='space-y-8'>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <MailIcon className="w-6 h-6 text-gray-400" />
                    <div className='ml-2 h-5 w-2 border-l-2 border-gray-400'></div>
                  </div>
                  <input
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Entrer votre email ici"
                    className="w-full pl-16 pr-4 py-4 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  /> 
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <LockIcon className="w-6 h-6 text-gray-400 " />
                    <div className='ml-2 h-5 w-2 border-l-2 border-gray-400'></div>
                  </div>
                  <input
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    type={ showPassword ? "text" : "password" }
                    placeholder="Entrer votre mot de passe ici"
                    className="w-full pl-16 pr-4 py-4 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
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
                 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"
                >
                  <LogInIcon className="w-5 h-5" />
                  <span>CONNEXTION</span>
                </button>
              </div>

              <p className='flex justify-center items-center'>
                Vous n'avez pas de compte?
                <span 
                 onClick={() => navigate("/register")}
                 className='text-blue-600 hover:text-blue-400'>
                  S'inscrire
                </span> 
              </p>
            </form>

        </div>

        <div className="hidden md:flex md:w-1/2 p-12 flex-col items-center justify-center text-center text-white 
                    bg-linear-to-br/srgb from-blue-700 via-blue-600 to-indigo-700 relative">
          
          <div className="absolute top-0 left-0 w-full h-full opacity-30 "></div>
          
          <div className="z-10">
            <h3 className="text-3xl font-bold mb-4">
              BIENVENU!
            </h3>
            <p className="text-lg mb-8">
              Entrez votre détails et commencez la journée avec nous
            </p>
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-full 
                         hover:bg-white hover:text-blue-600 transition duration-300 backdrop-blur-sm"
            >
              S'INSCRIRE
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

