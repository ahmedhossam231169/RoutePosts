"use client";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { loginUser } from "../../services/login.service";
import { loginSchema, type LoginSchema } from "../../lib/schema/lognin.schema";
import { authContext } from "../context/authcontext";



export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
    const { setToken }=useContext(authContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function clearForm() {
    reset();
  }

  async function loginSubmitForm(data: LoginSchema) {
    try {
      const loginResponse = await loginUser(data);
      console.log("Login successful:", loginResponse);
      toast.success("Login successful!");
      localStorage.setItem("userToken", loginResponse.data.token);
      setToken(loginResponse.data.token)
      setTimeout(() => {
        navigate("/");
      }, 2000);


    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      clearForm();
    }
  }

  const field =
    "w-full bg-transparent border-b border-line focus:border-ink py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors";

  return (
    <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(loginSubmitForm)}>
      <div className="flex flex-col gap-2">
        <label className="kicker text-ink-faint">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className={field}
        />
        {errors.email?.message && (
          <span className="text-xs text-accent">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="kicker text-ink-faint">Password</label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className={field + " pr-9"}
          />
          <button
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-0 top-1.5 text-ink-faint hover:text-ink transition-colors cursor-pointer"
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.password?.message && (
          <span className="text-xs text-accent">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-full bg-ink hover:bg-ink/90 text-paper text-sm font-medium py-3 rounded-xs cursor-pointer transition-colors"
      >
        Sign in
      </button>

      <p className="text-sm text-ink-soft text-center">
        No account?{" "}
        <Link to="/regester" className="text-ink underline underline-offset-2 decoration-line-strong hover:decoration-ink">
          Create one
        </Link>
      </p>
    </form>
  );
}
