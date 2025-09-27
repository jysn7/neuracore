// SignupForm.tsx or SignupForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeClosed, CheckCircle, LockIcon, SearchIcon } from "lucide-react";
import Terms from "./Terms";

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "innovator",
  });

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    
  };

  return (
    <div className="flex flex-col justify-center w-full  px- py-2 gap-4">
            <form className="bg-bg-gray tracking-wide flex flex-col items-center px-6 sm:px-6 md:px-8 py-8 h-full text-white rounded-3xl w-full ">
              <h1 className="text-xl font-semibold text-center">Create Account</h1>
              <h2 className="text-xs mt-3 text-text-secondary text-center">
                Start your innovation journey today
              </h2>

              <div className="flex mt-4 px-6 gap-4 w-full justify-between">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="text-[10px] text-neutral-300 font-semibold"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="e.g. John"
                    className="font-[500] text-[0.8vw] text-white bg-bg-dark rounded border-none outline-none px-[1vw] max-w-[190px] w-full h-8 placeholder:text-xs transition duration-400 mt-1 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="font-semibold text-neutral-300 text-[10px]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="e.g. Doe"
                    className="text-[0.8vw] text-white bg-bg-dark rounded border-none outline-none px-[1vw] max-w-[190px] w-full h-8 placeholder:text-xs transition duration-400 mt-1 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
                  />
                </div>
              </div>

              <div className="text-[10px] mt-6 w-full">
                <label
                  htmlFor="email"
                  className="font-semibold text-neutral-300 text-[10px]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. johndoe@gmail.com"
                  className="text-[0.8vw] text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
                />

                <label
                  htmlFor="password"
                  className="font-semibold text-neutral-300 text-[10px]"
                >
                  Password
                </label>
                <div className="relative items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="font-[500] text-[0.8vw] text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-[10px] text-neutral-400"
                  >
                    {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-neutral-300 text-[10px]"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="text-[0.8vw] text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
                />
              </div>

              <h1 className="font-semibold text-neutral-300 mr-[92%] text-[10px]">
                Role
              </h1>
              <div className="flex w-full mt-1 mb-4 text-sm font-medium">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="accountType"
                    value="innovator"
                    defaultChecked
                    className="hidden peer"
                  />
                  <span className="block w-full text-center text-xs px-4 py-1.5 border border-bg-dark bg-bg-dark text-text-secondary peer-checked:bg-btn-primary peer-checked:text-white peer-checked:border-bg-dark-gray-primary transition-all duration-300 rounded-l-lg cursor-pointer hover:bg-btn-secondary-hover hover:text-white">
                    Innovator
                  </span>
                </label>

                <label className="flex-1">
                  <input
                    type="radio"
                    name="accountType"
                    value="recruiter"
                    className="hidden peer"
                  />
                  <span className="block w-full text-center  text-xs px-4 py-1.5 border border-bg-dark bg-bg-dark text-text-secondary peer-checked:bg-btn-primary peer-checked:text-white peer-checked:border-bg-dark-gray transition-all duration-300 rounded-r-lg cursor-pointer hover:bg-btn-secondary-hover hover:text-white">
                    Recruiter
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 mt-2 mb-2 text-xs text-text-secondary">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                />
                <label htmlFor="terms ">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-brand-red cursor-pointer hover:underline"
                  >
                    Terms & Conditions
                  </button>
                </label>
              </div>


              <button
                type="submit"
                disabled={!termsAgreed}
                className="bg-btn-primary hover:bg-btn-primary-hover active:bg-black transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 w-full rounded-sm mt-2"
              >
                Create Account
              </button>

              <p className="text-[10px] mt-5 text-neutral-400 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-red hover:underline">
                  Sign in
                </Link>
              </p>
              <Terms show={showTerms} onClose={() => setShowTerms(false)} />
            </form>

          </div>
  );
}
