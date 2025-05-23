import { Link, useLocation } from '@remix-run/react';
import { MouseEvent } from "react";

const NavigationTabs = () => {
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
        <header className="flex gap-3 p-4 sm:p-6 md:p-8">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${location.pathname === item.path
                        ? "text-white border bg-[#5D5E5E] border-white"
                        : "bg-[#292a2a] hover:bg-[#5D5E5E] text-gray-300"
                        }`}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                >
                    {item.name}
                </Link>
            ))}
        </header>
    )
}

export default NavigationTabs