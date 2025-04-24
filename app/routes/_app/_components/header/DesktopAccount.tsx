// DesktopAccount.tsx
import { useState, useRef } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import { AccountIcon } from '~/Svgs';

const DesktopAccount = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

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
                    className="transition-colors p-2 rounded-full hover:bg-[#5D5E5E] bg-[#292a2a]"
                >
                    <AccountIcon width="24" height="24"/>
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