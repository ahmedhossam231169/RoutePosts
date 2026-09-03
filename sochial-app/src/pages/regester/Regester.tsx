import AppName from "../../components/appName/AppName";
import { RegesterForm } from "../../components/form/regesterform";



export default function Regester() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* editorial panel */}
      <div className="hidden lg:flex flex-col justify-between bg-ink text-paper p-12">
        <AppName />
        <div>
          <p className="font-display text-4xl leading-tight max-w-md">
            Bring your writing somewhere it can breathe.
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
          <RegesterForm />
        </div>
      </div>
    </div>
  )
}
