import { Link, useLocation } from '@remix-run/react';
import { MouseEvent } from 'react';
import Tooltip from '~/components/Tooltip';
import { useTooltipStore } from '~/store/useTooltipStore';
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
        <Tooltip text='Home' className='top-10' />

        <Link to="/" onClick={(e) => handleLinkClick(e, "/")}>
          <button
            className={`flex items-center ${isActive("/") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"
              } transition-colors`}
          >
            <HomeIcon width="24" height="24" />
            <span className="hidden lg:inline ml-2 font-medium text-lg">Home</span>
          </button>
        </Link>

      </div>


      <div className='relative group'>
        <Tooltip text='Explore' className='top-10' />

        {/* Explore Link - Will highlight for /explore and all sub-routes */}
        <Link to="/explore" onClick={(e) => handleLinkClick(e, "/explore")}>
          <button
            className={`flex items-center ${isActive("/explore") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"
              } transition-colors`}
          >
            <ExploreIcon width="24" height="24" />
            <span className="hidden lg:inline ml-2 font-medium text-lg">Explore</span>
          </button>
        </Link>

      </div>

      <div className='relative group'>
        <Tooltip text='Library' className='top-10' />

        {/* Library Link */}
        <Link to="/my/library" onClick={(e) => handleLinkClick(e, "/my/library")}>
          <button
            className={`flex items-center ${isActive("/my/library") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"
              } transition-colors`}
          >
            <LibraryIcon width="24" height="24" />
            <span className="hidden lg:inline ml-2 font-medium text-lg">Library</span>
          </button>
        </Link>

      </div>
    </nav>
  );
}

export default DesktopNavigation;