"use client";
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ca } from 'zod/locales';
import { signInWithEmail } from '../auth-functions';




  // Zod schema for validation
  const LoginSchema = z.object({

    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()

  });

  type FormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData ] = useState({
      email: "",
      password: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  
    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      //console.log("Login Data:", formData);
     // link to backend
    };

async function handleSubmitAsync(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  signInWithEmail(email, password);
}
  return (
    <div className="flex flex-col justify-center w-full  px-2 py-2 gap-4">
            <form 
             onSubmit={handleSubmitAsync} 
             className="bg-bg-gray md:px-8 tracking-wide flex flex-col items-center px-4 sm:px-6  py-8 h-full text-white rounded-3xl w-full ">
              <h1 className="text-xl font-semibold text-center">Sign in</h1>
              <h2 className="text-xs mt-2 text-neutral-400 text-center">Enter your credentials to access your account</h2>

              <div className="text-[10px] mt-6 w-full">
                <label htmlFor="email" className='font-semibold text-neutral-300'>Username</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder='username@neura.com'
                  className="
                            text-[0.8vw] text-white 
                           bg-[#242424] 
                           rounded border-none outline-none 
                           px-[1vw] w-full h-8 mt-2 mb-4
                           placeholder:text-xs 
                           transition duration-400

                           hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)]
                           focus:shadow-[0_0_0_0.15vw_#DF1616]
                         "
                />

                <label htmlFor="password" className='font-semibold text-neutral-300 text-[10px]'>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    placeholder='Enter your password'
                    className="
                            text-[0.8vw] text-white 
                           bg-[#242424] 
                           rounded border-none outline-none 
                           px-[1vw] w-full h-8 mt-2 mb-4
                           placeholder:text-xs 
                           transition duration-400

                           hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)]
                           focus:shadow-[0_0_0_0.15vw_#DF1616]
                         "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-4 text-[10px] text-neutral-400"
                  >
                    {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-btn-primary hover:bg-btn-primary-hover transition-all duration-300 cursor-pointer text-white text-sm font-semibold py-2 w-full rounded-sm mt-2"
              >
                Sign In
              </button>

              <p className="text-[10px] mt-5 text-text-secondary text-center">
                Don't have an account?{' '}
                <Link href="/signup" className="text-brand-red hover:underline">Sign up here</Link>
                
              </p>
            </form>
          </div>
  )
}

export default LoginForm