import React, { useState } from 'react'
import { Lock as LockIcon, Mail as MailIcon, Eye, EyeOff } from 'lucide-react';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='grid w-full h-screen place-items-center bg-gray-100'>
      <div className="flex w-full max-w-6xl bg-white shadow-[0_0_50px_5px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden">

        <div className='w-full md:w-1/2 px-20 pt-16 pb-10 flex flex-col justify-center'>
            <h2 className='text-3xl font-medium text-gray-800 mb-10 text-center'>S'inscrire</h2>

            <form className='space-y-8'>

              <div className='space-y-6'>

                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  /> 

                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  /> 

                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  /> 

                <div className="relative">
                  <input
                    type={ showPassword ? "text" : "password" }
                    placeholder="votre mot de passe"
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
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

                <div className="relative">
                  <input
                    type={ showPassword ? "text" : "password" }
                    placeholder="Confirmer votre mot de passe"
                    className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
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

              <div className="relative">
                <select
                  className="w-full pl-5 pr-4 py-2 border-l-5 border-blue-700 rounded-sm shadow-[0_0_14px_4px_rgba(0,0,0,0.2)] appearance-none bg-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 cursor-pointer"
                >
                  <option value="utilisateurSimple">Utilisateur Simple</option>
                  <option value="responsableRH">Responsable RH</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className='flex justify-center items-center'>
                <button
                type="submit"
                className="flex space-x-2 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white
                 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"
                >
                  <span>INSCRIVEZ</span>
                </button>
              </div>

              <p className='flex justify-center items-center'>
                Vous avez déjà un compte? 
                <a href="#" className='text-blue-600 hover:text-blue-400'>
                  se Connecter
                </a> 
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
              type="button"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-full 
                         hover:bg-white hover:text-blue-600 transition duration-300 backdrop-blur-sm"
            >
              SE CONNECTER
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register