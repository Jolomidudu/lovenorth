"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, User } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/discover", icon: Compass, label: "Discover" },
  { href: "/matches", icon: Heart, label: "Matches" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fffaf3]/95 backdrop-blur-xl border-t border-[#dfe9dc] safe-area-pb shadow-[0_-8px_24px_rgba(91,67,55,0.08)]">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 w-20 h-full transition-colors",
                  active ? "text-[#58795e]" : "text-[#8d7d72] hover:text-[#58795e]"
              )}
            >
              <Icon
                  className={clsx("w-6 h-6", active && "fill-[#6f9274]/20")}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className="text-[11px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
