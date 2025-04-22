import { useState } from 'react'
import DesktopNavigation from './DesktopNavigation'
import DesktopSearch from './DesktopSearch'
import MobileNavigation from './MobileNavigation'
import DesktopAccount from './DesktopAccount'

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-lg border-b border-[#2E3030]">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-base cursor-pointer sm:text-lg md:text-xl font-bold mr-4 sm:mr-8 md:mr-14 whitespace-nowrap">FlowTune</span>

                    {/* Desktop Navigation */}
                    <DesktopNavigation />
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center">
                    {/* Desktop Search */}
                    

                    <DesktopSearch />
                    

                    {/* Mobile Icons */}
                    <MobileNavigation />

                    {/* Desktop Account */}
                    <DesktopAccount />
                </div>
            </div>
        </header>
    )
}

export default Header