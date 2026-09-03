"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";
import { registerSchema, type RegisterSchema } from "../../lib/schema/auht.schema";




export function RegesterForm() {
  const [isVisiblee, setIsVisiblee] = useState(false);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmitForm(data: RegisterSchema) {
    try {
      const response = await registerUser(data);
      toast.success("Registration successful!");
      setTimeout(() => {
      navigation("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
      reset();
    }
  }

  const onSubmitError = (formErrors: typeof errors) => {
    console.log("submit errors:", formErrors);
  };

  const field =
    "w-full bg-transparent border-b border-line focus:border-ink py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors";
  const errText = "text-xs text-accent";

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Create account</h1>
      <p className="text-sm text-ink-soft mt-1 mb-8">A minute, and you're in.</p>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
      >
        <div className="flex flex-col gap-1.5">
          <input {...register("name")} placeholder="Full name" className={field} />
          {errors.name?.message && <span className={errText}>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <input {...register("username")} placeholder="Username" className={field} />
          {errors.username?.message && <span className={errText}>{errors.username.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <input {...register("email")} type="email" placeholder="Email address" className={field} />
          {errors.email?.message && <span className={errText}>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Controller
            name="gender"
            control={control}
            render={({ field: f }) => (
              <select
                value={f.value}
                onChange={f.onChange}
                aria-label="Gender"
                className={field + (f.value ? " text-ink" : " text-ink-faint")}
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          />
          {errors.gender?.message && <span className={errText}>{errors.gender.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <input {...register("dateOfBirth")} type="date" aria-label="Date of birth" className={field} />
          {errors.dateOfBirth?.message && <span className={errText}>{errors.dateOfBirth.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="relative">
            <input
              {...register("password")}
              type={isVisiblee ? "text" : "password"}
              placeholder="Password"
              className={field + " pr-9"}
            />
            <button
              type="button"
              aria-label={isVisiblee ? "Hide password" : "Show password"}
              onClick={() => setIsVisiblee(!isVisiblee)}
              className="absolute right-0 top-1.5 text-ink-faint hover:text-ink transition-colors cursor-pointer"
            >
              {isVisiblee ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.password?.message && <span className={errText}>{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <input
            {...register("rePassword")}
            type={isVisiblee ? "text" : "password"}
            placeholder="Confirm password"
            className={field}
          />
          {errors.rePassword?.message && <span className={errText}>{errors.rePassword.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 w-full bg-ink hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-sm font-medium py-3 rounded-xs cursor-pointer transition-colors"
        >
          {isSubmitting ? "Creating…" : "Create account"}
        </button>

        <p className="text-sm text-ink-soft text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-ink underline underline-offset-2 decoration-line-strong hover:decoration-ink">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
