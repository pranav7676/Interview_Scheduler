// src/components/navbar.tsx
import {
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">S</div>
        <span className="font-semibold text-lg">Synergech</span>
      </div>

      {/* Middle: Navigation links */}
      <div className="flex items-center gap-8 text-sm text-gray-600">
        <NavItem to="/" icon={<HomeIcon className="w-5 h-5" />} label="Calendar" />
        <NavItem to="/jobs" icon={<BriefcaseIcon className="w-5 h-5" />} label="Jobs" />
        <NavItem to="/candidates" icon={<UserGroupIcon className="w-5 h-5" />} label="Candidates" />
        <NavItem to="/interviews" icon={<CalendarIcon className="w-5 h-5" />} label="Interviews" />
        <NavItem to="/settings" icon={<CogIcon className="w-5 h-5" />} label="Settings" />
      </div>

      {/* Right: User profile */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <img
          src="https://i.pravatar.cc/32"
          className="rounded-full w-8 h-8"
          alt="User Avatar"
        />
        <span className="font-medium">John Smith</span>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center text-center hover:text-blue-600 transition-colors"
    >
      {icon}
      <span className="text-xs mt-0.5">{label}</span>
    </Link>
  );
}