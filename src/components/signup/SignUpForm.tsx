// SignupForm.tsx or SignupForm.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Eye,
  EyeClosed,
  CheckCircle,
  LockIcon,
  SearchIcon,
} from "lucide-react";
import Terms from "./Terms";
import { supabase } from "@/app/supabase-client";
import { signUpWithEmail } from "../auth-functions";
export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Zod schema for validation
  const signupSchema = z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, {
          message: "Password must include at least one uppercase letter",
        }),
      confirmPassword: z.string(),
      accountType: z.enum(["innovator", "recruiter"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type SignupFormData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "innovator",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signUpWithEmail(data.email, data.password);
    // Add signup logic here
  };

  return (
    <div className="flex flex-col justify-center w-full  px- py-2 gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg-gray tracking-wide flex flex-col items-center px-6 sm:px-6 md:px-8 py-8 h-full text-white rounded-3xl w-full "
      >
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
              {...register("firstName")}
              placeholder="e.g. John"
              className="font-[500]  text-white bg-bg-dark rounded border-none outline-none px-[1vw] max-w-[190px] w-full h-8 placeholder:text-xs transition duration-400 mt-1 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
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
              {...register("lastName")}
              placeholder="e.g. Doe"
              className=" text-white bg-bg-dark rounded border-none outline-none px-[1vw] max-w-[190px] w-full h-8 placeholder:text-xs transition duration-400 mt-1 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
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
            {...register("email")}
            placeholder="e.g. johndoe@gmail.com"
            className=" text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}

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
              {...register("password")}
              placeholder="Enter your password"
              className="font-[500] text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
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
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
            className=" text-white bg-bg-dark rounded border-none outline-none px-[1vw] w-full h-8 mt-1 mb-4 placeholder:text-xs transition duration-400 hover:shadow-[0_0_0_0.15vw_rgba(223,22,22,0.4)] focus:shadow-[0_0_0_0.15vw_#DF1616]"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <h1 className="font-semibold text-neutral-300 mr-[92%] text-[10px]">
          Role
        </h1>
        <div className="flex w-full mt-1 mb-4 text-sm font-medium">
          <label className="flex-1">
            <input
              type="radio"
              value="innovator"
              {...register("accountType")}
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
              value="recruiter"
              {...register("accountType")}
              className="hidden peer"
            />
            {errors.accountType && (
              <p className="text-red-400 text-xs mt-1">
                {errors.accountType.message}
              </p>
            )}
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
