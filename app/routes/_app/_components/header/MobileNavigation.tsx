import { Link, useLocation } from '@remix-run/react';
import { MouseEvent, useRef, useState } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import { AccountIcon, ExploreIcon, HomeIcon, LibraryIcon, SearchIcon } from '~/Svgs';
import Tooltip from '~/components/Tooltip';

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
                <Link to={"/"} onClick={(e) => handleLinkClick(e, "/")} className='cursor-default'>
                    <button className={`mt-1.5 relative group transition-colors ${isActive("/") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"}`}>
                        <Tooltip text='Home' className='mt-10' />
                        <HomeIcon width="24" height="24" />
                    </button>
                </Link>

                <Link to={"/explore"} onClick={(e) => handleLinkClick(e, "/explore")} className='cursor-default'>
                    <button className={`relative group mt-1.5 transition-colors ${isActive("/explore") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"}`}>
                        <Tooltip text='Explore' className='mt-10' />
                        <ExploreIcon width="24" height="24" />
                    </button>
                </Link>

                <Link to={"/my/library"} onClick={(e) => handleLinkClick(e, "/my/library")} className='cursor-default'>
                    <button className={`relative group mt-1.5 transition-colors ${isActive("/my/library") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"}`}>
                        <Tooltip text='Library' className='mt-10' />
                        <LibraryIcon width="24" height="24" />
                    </button>
                </Link>

                <Link to={"/search"} onClick={(e) => handleLinkClick(e, "/search")} className='cursor-default'>
                    <button className={`relative group mt-1.5 transition-colors ${isActive("/search") ? "text-[#25d1da]" : "hover:text-[#93D0D5]"}`}>
                        <Tooltip text='Search' className='mt-10' />
                        <SearchIcon width="24" height="24" />
                    </button>
                </Link>



                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hover:text-[#93D0D5] text-white transition-colors relative group "
                    ref={buttonRef}
                >
                    <Tooltip text='Account' className='mt-10 -ml-2' />
                    <AccountIcon width="24" height="24" />

                </button>

                {/* Dropdown Menu with Animation */}
                <ProfileDropDownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} triggerRef={buttonRef} />
            </div>
        </>
    );
};

export default MobileNavigation;