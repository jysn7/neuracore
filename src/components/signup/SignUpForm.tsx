// SignupForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import Terms from "./Terms";
import { signUpWithEmail } from "../auth-functions";
import { toast } from "sonner"; // 🔹 import toast

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  // const router = useRouter();

  const signupSchema = z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" }),
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

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { error } = await signUpWithEmail(data.email, data.password);
      if (error) throw error;

      toast.success("Account created! Please check your email to confirm.");
      // router.push(`/confirmation?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      console.error("Signup failed:", err.message);
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col justify-center w-full  px- py-2 gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-bg-gray tracking-wide flex flex-col items-center px-6 sm:px-6 md:px-8 py-8 h-full text-white rounded-3xl w-full"
      >
        <h1 className="text-xl font-semibold text-center">Create Account</h1>
        <h2 className="text-xs mt-3 text-text-secondary text-center">
          Start your innovation journey today
        </h2>

        {/* First & Last Name */}
        <div className="flex mt-4 px-6 gap-4 w-full justify-between">
          <div className="flex-1">
            <label className="text-[10px] text-neutral-300 font-semibold">First Name</label>
            <input type="text" {...register("firstName")} placeholder="e.g. John" className="..." />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-neutral-300 font-semibold">Last Name</label>
            <input type="text" {...register("lastName")} placeholder="e.g. Doe" className="..." />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="text-[10px] mt-6 w-full">
          <label className="font-semibold text-neutral-300 text-[10px]">Email Address</label>
          <input type="email" {...register("email")} placeholder="e.g. johndoe@gmail.com" className="..." />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}

          {/* Password */}
          <label className="font-semibold text-neutral-300 text-[10px] mt-2">Password</label>
          <div className="relative items-center">
            <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Enter your password" className="..." />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-3 text-[10px] text-neutral-400">
              {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="font-semibold text-neutral-300 text-[10px]">Confirm Password</label>
          <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm your password" className="..." />
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Role */}
        <h1 className="font-semibold text-neutral-300 mr-[92%] text-[10px]">Role</h1>
        <div className="flex w-full mt-1 mb-4 text-sm font-medium">
          <label className="flex-1">
            <input type="radio" value="innovator" {...register("accountType")} defaultChecked className="hidden peer" />
            <span className="block w-full text-center text-xs px-4 py-1.5 border rounded-l-lg cursor-pointer peer-checked:bg-btn-primary peer-checked:text-white">Innovator</span>
          </label>
          <label className="flex-1">
            <input type="radio" value="recruiter" {...register("accountType")} className="hidden peer" />
            <span className="block w-full text-center text-xs px-4 py-1.5 border rounded-r-lg cursor-pointer peer-checked:bg-btn-primary peer-checked:text-white">Recruiter</span>
          </label>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 mt-2 mb-2 text-xs text-text-secondary">
          <input type="checkbox" required onChange={(e) => setTermsAgreed(e.target.checked)} />
          <label>
            I agree to the{" "}
            <button type="button" onClick={() => setShowTerms(true)} className="text-brand-red cursor-pointer hover:underline">
              Terms & Conditions
            </button>
          </label>
        </div>

        <button type="submit" disabled={!termsAgreed} className="bg-btn-primary hover:bg-btn-primary-hover w-full py-2 mt-2 text-white rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
