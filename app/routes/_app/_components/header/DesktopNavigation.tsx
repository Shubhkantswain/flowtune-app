import { Link, useLocation } from '@remix-run/react';
import { MouseEvent } from 'react';
import { ExploreIcon, HomeIcon, LibraryIcon } from '~/Svgs';

const DesktopNavigation = () => {
  const location = useLocation();

  // Handles exact matches and explore sub-routes
  const isActive = (path: string) => {
    return location.pathname === path ||
      (path === "/explore" && location.pathname.startsWith("/explore"));
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isActive(path)) {
      event.preventDefault();
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-14">
      {/* Home Link */}
      <div className='relative group'>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
          Home
        </div>
        <Link to="/" onClick={(e) => handleLinkClick(e, "/")}>
          <button
            className={`flex items-center ${isActive("/") ? "text-[#25d1da]" : "hover:text-[#25d1da]"
              } transition-colors`}
          >
            <HomeIcon width="24" height="24" />
            <span className="hidden lg:inline ml-2 font-medium text-lg">Home</span>
          </button>
        </Link>
      </div>


      <div className='relative group'>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
          Explore
        </div>
        {/* Explore Link - Will highlight for /explore and all sub-routes */}
        <Link to="/explore" onClick={(e) => handleLinkClick(e, "/explore")}>
          <button
            className={`flex items-center ${isActive("/explore") ? "text-[#25d1da]" : "hover:text-[#25d1da]"
              } transition-colors`}
          >
            <ExploreIcon width="24" height="24" />
            <span className="hidden lg:inline ml-2 font-medium text-lg">Explore</span>
          </button>
        </Link>
      </div>

      <div className='relative group'>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
          Library
        </div>
        {/* Library Link */}
        <Link to="/my/library" onClick={(e) => handleLinkClick(e, "/my/library")}>
          <button
            className={`flex items-center ${isActive("/my/library") ? "text-[#25d1da]" : "hover:text-[#25d1da]"
              } transition-colors`}
          >
            <LibraryIcon width="24" height="24"/>
            <span className="hidden lg:inline ml-2 font-medium text-lg">Library</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default DesktopNavigation;