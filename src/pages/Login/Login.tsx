import AppName from "../../components/appName/AppName";
import { LoginForm } from "../../components/form/Loginform";

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* editorial panel */}
      <div className="hidden lg:flex flex-col justify-between bg-ink text-paper p-12">
        <AppName />
        <div>
          <p className="font-display text-4xl leading-tight max-w-md">
            Somewhere quiet to write and read.
          </p>
          <p className="font-mono text-xs text-paper/50 mt-6 uppercase tracking-[0.15em]">
            Route Posts — est. 2026
          </p>
        </div>
      </div>

      {/* form side */}
      <div className="flex flex-col items-center justify-center bg-paper text-ink px-5 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <AppName />
          </div>
          <h1 className="font-display text-3xl text-ink">Welcome back</h1>
          <p className="text-sm text-ink-soft mt-1 mb-8">Sign in to continue.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
