// DesktopAccount.tsx
import React, { useState, useRef } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';

function DesktopAccount() {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [musicPreferencesOpen, setMusicPreferencesOpen] = useState(false)


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="hidden md:block relative group">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                    Account
                </div>

                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className="transition-colors p-2 rounded-full hover:bg-[#727171] bg-[#313232]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><defs><path id="ic_navigation_profile-a" d="M7,6 C7,3.239 9.239,1 12,1 C14.761,1 17,3.239 17,6 C17,8.761 14.761,11 12,11 C9.239,11 7,8.761 7,6 Z M21.948,18.684 C20.868,15.443 17.015,12 12,12 C6.985,12 3.131,15.443 2.051,18.684 C1.931,19.043 2.025,19.44 2.293,19.707 C4.417,21.83 7.864,23 12,23 C16.137,23 19.584,21.83 21.707,19.707 C21.975,19.439 22.068,19.043 21.948,18.684 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_navigation_profile-a" fill="currentColor"></use></g></svg>
                </button>
            </div>
            <ProfileDropDownMenu
                isDropdownOpen={isOpen}
                setIsDropdownOpen={setIsOpen}
                triggerRef={buttonRef}
            />


        </>
    );
}

export default DesktopAccount;