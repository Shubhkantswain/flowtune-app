import { Link, useLocation } from '@remix-run/react';
import { MouseEvent, useRef, useState } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import { AccountIcon, ExploreIcon, HomeIcon, LibraryIcon, SearchIcon } from '~/Svgs';

const MobileNavigation = () => {
    const location = useLocation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const isActive = (path: string) => location.pathname === path ||
        (path === "/explore" && location.pathname.startsWith("/explore"));

    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
        if (isActive(path)) {
            event.preventDefault(); // Prevent navigation if already on the same route
        }
    };

    return (
        <>
            <div className="flex md:hidden items-center space-x-7">
                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Home
                    </div>

                    <Link to={"/"} onClick={(e) => handleLinkClick(e, "/")}>
                        <button className={`hover:text-[#25d1da] transition-colors ${isActive("/") ? "text-[#25d1da]" : ""}`}>
                            <HomeIcon width="24" height="24" />
                        </button>
                    </Link>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Explore
                    </div>

                    <Link to={"/explore"} onClick={(e) => handleLinkClick(e, "/explore")}>
                        <button className={`hover:text-[#25d1da] transition-colors ${isActive("/explore") ? "text-[#25d1da]" : ""}`}>
                            <ExploreIcon width="24" height="24" />
                        </button>
                    </Link>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Library
                    </div>

                    <Link to={"/my/library"} onClick={(e) => handleLinkClick(e, "/my/library")}>
                        <button className={`hover:text-[#25d1da] transition-colors ${isActive("/my/library") ? "text-[#25d1da]" : ""}`}>
                            <LibraryIcon width="24" height="24" />
                        </button>
                    </Link>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Search
                    </div>

                    <Link to={"/search"} onClick={(e) => handleLinkClick(e, "/search")}>
                        <button className={`hover:text-[#25d1da] transition-colors ${isActive("/search") ? "text-[#25d1da]" : ""}`}>
                            <SearchIcon width="24" height="24" />
                        </button>
                    </Link>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Account
                    </div>

                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="hover:text-[#25d1da] text-white transition-colors"
                        ref={buttonRef}
                    >
                        <AccountIcon width="24" height="24" />

                    </button>
                </div>


                {/* Dropdown Menu with Animation */}
                <ProfileDropDownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} triggerRef={buttonRef} />
            </div>
        </>
    );
};

export default MobileNavigation;