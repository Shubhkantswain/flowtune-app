import { Link, useLocation } from '@remix-run/react';
import React, { MouseEvent, useRef, useState } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';

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

                    <button className={`hover:text-[#25d1da] transition-colors ${isActive("/") ? "text-[#25d1da]" : ""}`}>
                        <Link to={"/"} onClick={(e) => handleLinkClick(e, "/")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_navigation_home" d="M21.343,8.661 L13.448,1.556 C12.625,0.815 11.375,0.815 10.552,1.556 L2.657,8.661 C2.238,9.039 2,9.564 2,10.113 L2,20 C2,21.105 2.943,22 4.105,22 L9,22 L9,13 L15,13 L15,22 L19.895,22 C21.057,22 22,21.105 22,20 L22,10.113 C22,9.564 21.762,9.039 21.343,8.661 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_navigation_home" fill="currentColor"></use></g></svg>
                        </Link>
                    </button>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Explore
                    </div>

                    <button className={`hover:text-[#25d1da] transition-colors ${isActive("/explore") ? "text-[#25d1da]" : ""}`}>
                        <Link to={"/explore"} onClick={(e) => handleLinkClick(e, "/explore")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-compass"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /><circle cx="12" cy="12" r="10" /></svg>
                        </Link>
                    </button>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Library
                    </div>

                    <button className={`hover:text-[#25d1da] transition-colors ${isActive("/my/library") ? "text-[#25d1da]" : ""}`}>
                        <Link to={"/my/library"} onClick={(e) => handleLinkClick(e, "/my/library")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28"><defs><path id="library_heartfilled" fill-rule="nonzero" d="M5.86159 6.91042C5.6 7.42381 5.6 8.09588 5.6 9.44V22.16C5.6 23.5041 5.6 24.1762 5.86159 24.6896C6.09168 25.1412 6.45883 25.5084 6.91042 25.7384C7.42381 26 8.09588 26 9.44 26H22.16C23.5041 26 24.1762 26 24.6896 25.7384C25.1412 25.5084 25.5084 25.1412 25.7384 24.6896C26 24.1762 26 23.5041 26 22.16V9.44C26 8.09588 26 7.42381 25.7384 6.91042C25.5084 6.45883 25.1412 6.09168 24.6896 5.86159C24.1762 5.6 23.5041 5.6 22.16 5.6H9.44C8.09588 5.6 7.42381 5.6 6.91042 5.86159C6.45883 6.09168 6.09168 6.45883 5.86159 6.91042ZM15.8 13.1037C16.4812 11.0848 17.3774 10.414 18.9549 10.414C20.5323 10.414 22.1097 11.4233 22.1097 14.0004C22.1097 16.9904 18.635 19.3545 16.6814 20.6838C16.4734 20.8254 16.2826 20.9551 16.1152 21.0727C16.0198 21.1396 15.9096 21.1731 15.8 21.1731C15.6904 21.1731 15.5803 21.1396 15.4849 21.0727C15.3177 20.9553 15.1274 20.8258 14.9198 20.6847C12.9662 19.3557 9.49029 16.9911 9.49029 14.0004C9.49029 11.4233 11.0677 10.414 12.6452 10.414C14.2226 10.414 15.1059 11.0636 15.8 13.1037Z"></path><path id="library_heartfilled-1" fill-rule="nonzero" d="M2.26159 3.31042C2 3.82381 2 4.49588 2 5.84V18.56C2 19.9041 2 20.5762 2.26159 21.0896C2.49168 21.5412 2.85883 21.9084 3.31042 22.1384C3.47037 22.2199 3.64572 22.276 3.85198 22.3147V7.45198C3.85198 5.46376 5.46376 3.85198 7.45198 3.85198H22.3147C22.276 3.64572 22.2199 3.47037 22.1384 3.31042C21.9084 2.85883 21.5412 2.49168 21.0896 2.26159C20.5762 2 19.9041 2 18.56 2H5.84C4.49588 2 3.82381 2 3.31042 2.26159C2.85883 2.49168 2.49168 2.85883 2.26159 3.31042Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="28" height="28"></rect><use href="#library_heartfilled-1" fill="currentColor"></use><use href="#library_heartfilled" fill="currentColor"></use></g></svg>
                        </Link>
                    </button>
                </div>

                <div className='relative group mt-1.5'>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                        Search
                    </div>

                    <button className={`hover:text-[#25d1da] transition-colors ${isActive("/search") ? "text-[#25d1da]" : ""}`}>
                        <Link to={"/search"} onClick={(e) => handleLinkClick(e, "/search")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </Link>
                    </button>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"><defs><path id="ic_navigation_profile-a" d="M7,6 C7,3.239 9.239,1 12,1 C14.761,1 17,3.239 17,6 C17,8.761 14.761,11 12,11 C9.239,11 7,8.761 7,6 Z M21.948,18.684 C20.868,15.443 17.015,12 12,12 C6.985,12 3.131,15.443 2.051,18.684 C1.931,19.043 2.025,19.44 2.293,19.707 C4.417,21.83 7.864,23 12,23 C16.137,23 19.584,21.83 21.707,19.707 C21.975,19.439 22.068,19.043 21.948,18.684 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_navigation_profile-a" fill="currentColor"></use></g></svg>
                    </button>
                </div>


                {/* Dropdown Menu with Animation */}
                <ProfileDropDownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} triggerRef={buttonRef} />
            </div>
        </>
    );
};

export default MobileNavigation;