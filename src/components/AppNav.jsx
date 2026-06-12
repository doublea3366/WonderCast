import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Headphones, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Create", exact: true },
  { to: "/library", label: "Library" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/for-families", label: "For families" },
  { to: "/faq", label: "FAQ" },
];

export default function AppNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="mb-6 rounded-[28px] border border-[#E7B05E]/30 bg-white/70 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur">
      {/* Desktop nav */}
      <div className="flex items-center justify-between gap-4 p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="WonderCast" className="size-12 rounded-2xl object-cover" />
          <div>
            <p className="text-xl font-bold leading-tight text-[#1B203A]">WonderCast</p>
            <p className="text-sm font-medium text-[#7F3E28]">Screen-free learning for curious kids</p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? "bg-[#1B203A] text-white"
                    : "text-[#7F3E28] hover:bg-[#E7B05E]/20 hover:text-[#1B203A]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="grid size-11 place-items-center rounded-2xl bg-[#E7B05E]/30 text-[#1B203A] transition hover:bg-[#E7B05E]/50 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-[#E7B05E]/30 p-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-center text-sm font-bold transition ${
                    isActive
                      ? "bg-[#1B203A] text-white"
                      : "bg-[#E7B05E]/20 text-[#7F3E28] hover:bg-[#E7B05E]/40"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
