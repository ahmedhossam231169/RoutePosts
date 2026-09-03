import { NavLink } from "react-router";
import { Home, User, Bell } from "lucide-react";
import { DropDown } from "../dropdown/DropDown";

const tabs = [
  { to: "/feed", label: "Feed", icon: Home },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/notification", label: "Notifications", icon: Bell },
];

export default function Navbar() {
  return (
    <>
      {/* top bar */}
      <nav className="sticky top-0 z-40 bg-paper/85 backdrop-blur-sm border-b border-line">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 h-16 px-4 sm:px-5">

          {/* wordmark */}
          <NavLink to="/feed" className="font-display text-xl sm:text-2xl font-medium tracking-tight shrink-0">
            Route<span className="text-accent">.</span>
          </NavLink>

          {/* primary nav — tablet / desktop only, underlined active state */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-7 text-sm">
            {tabs.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  "relative py-1 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-ink after:transition-all " +
                  (isActive
                    ? "text-ink after:right-0"
                    : "text-ink-soft hover:text-ink after:right-full")
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="shrink-0">
            <DropDown />
          </div>
        </div>
      </nav>

      {/* bottom bar — mobile only */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-sm border-t border-line">
        <div className="flex items-stretch justify-around">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                "flex flex-col items-center gap-1 py-2.5 px-4 flex-1 transition-colors " +
                (isActive ? "text-ink" : "text-ink-faint")
              }
            >
              <Icon size={19} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
