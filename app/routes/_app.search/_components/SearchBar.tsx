import React from 'react'

function SearchBar() {
    return (
        <div className="block md:hidden mt-2 mb-10">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-10 text-black rounded-lg bg-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#fa586a]"
                />
                <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </div>
        </div>
    )
}

export default SearchBar