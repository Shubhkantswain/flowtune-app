import React, { useState } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';

function DesktopSearch() {
    const location = useLocation();
    const navigate = useNavigate();
    const isSearchPage = location.pathname === "/search";
    const [searchValue, setSearchValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleInputClick = () => {
        if (!isSearchPage) {
            navigate('/search');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div
            className={`
                hidden md:flex items-center backdrop-blur-sm rounded-full px-4 py-2 mr-6
                ${isSearchPage ? 'bg-[#313232] shadow-lg' : 'hover:bg-gray-50  bg-white'} 
                transition-all duration-300 ease-in-out
                transform origin-right
                ${isSearchPage ? 'scale-105 translate-y-0' : 'translate-y-0'}
                ${isHovered ? 'w-80' : 'w-72'}
                hover:ring-2 hover:ring-blue-200 hover:ring-opacity-50
                group
            `}
            onClick={handleInputClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transformOrigin: 'center right',
            }}
        >
            <div className={`
                relative
                transition-transform duration-300
                ${isSearchPage ? 'rotate-90' : 'rotate-0'}
                ${isHovered ? 'scale-110' : 'scale-100'}
                group-hover:rotate-12
            `}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isSearchPage ? '#4B5563' : '#b2b2b2'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search transition-colors duration-300"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search"
                className={`
                    bg-transparent outline-none ml-2
                    transition-all duration-300 ease-in-out
                    placeholder-gray-400
                    ${isHovered ? 'w-64' : 'w-56'}
                    focus:ring-0 focus:outline-none
                    transform
                    ${isSearchPage ? 'scale-105 text-white' : 'scale-100 text-black'}
                    ${isHovered ? 'translate-x-2' : 'translate-x-0'}
                `}
                value={searchValue}
                onChange={handleInputChange}
            />
            <div className={`
                absolute right-4
                transition-all duration-300 ease-in-out
                transform
                ${searchValue ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}>
                {searchValue && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSearchValue('');
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default DesktopSearch;