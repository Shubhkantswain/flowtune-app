import { Link, Outlet, useLocation } from "@remix-run/react";
import { MouseEvent } from "react";

export default function ExploreLayout() {
  const location = useLocation();
  
  const navItems = [
    { name: "Tracks", path: "/explore" },
    { name: "Playlists", path: "/explore/playlists" },
  ];

  const handleLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (location.pathname === path) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Navigation Tabs */}
      <header className="flex gap-3 p-4 sm:p-6 md:p-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={(e) => handleLinkClick(e, item.path)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            aria-current={location.pathname === item.path ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </header>

      {/* Dynamic Content */}
      <Outlet />
    </div>
  );
}