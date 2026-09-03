import { LogOut, ChevronDown, Settings, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { authContext } from "../context/authcontext";
import { userContext } from "../context/userContext";

export function DropDown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { setToken } = useContext(authContext);
  const { userData } = useContext(userContext)
  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(null);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 py-1 pl-1 pr-2 rounded-xs hover:bg-line/50 cursor-pointer transition-colors"
      >
        <img
          src={userData?.photo}
          alt="user avatar"
          className="w-8 h-8 rounded-xs object-cover"
        />
        <span className="text-sm font-medium text-ink hidden sm:block">{userData?.name}</span>
        <ChevronDown size={15} className={"text-ink-faint transition-transform " + (open ? "rotate-180" : "")} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-raise rounded-card border border-line shadow-pop py-1.5 z-50 rise">
          <p className="px-3.5 pt-1.5 pb-2 kicker text-ink-faint">Account</p>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink-soft hover:text-ink hover:bg-paper transition-colors"
          >
            <User size={15} />
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink-soft hover:text-ink hover:bg-paper transition-colors"
          >
            <Settings size={15} />
            Settings
          </Link>
          <div className="my-1.5 border-t border-line" />
          <button
            onClick={() => {
              setOpen(false);
              logoutUser();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-accent hover:bg-accent-soft cursor-pointer transition-colors"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
