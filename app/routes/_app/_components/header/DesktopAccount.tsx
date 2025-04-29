// DesktopAccount.tsx
import { useState, useRef } from 'react';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import { AccountIcon } from '~/Svgs';
import Tooltip from '~/components/Tooltip';

const DesktopAccount = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="hidden md:block">

                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className="relative group transition-colors p-2 rounded-full hover:bg-[#5D5E5E] bg-[#292a2a]"
                >
                    <Tooltip text='Account' className='top-12' />
                    <AccountIcon width="24" height="24" />
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