import React from 'react'

function Header({ onClose }: {
    onClose: () => void;
}) {
    return (
        <div className="p-4 flex items-center justify-between backdrop-blur-sm">
            <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            {/* more icon */}
            <button className="text-zinc-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
            </button>
        </div>
    )
}

export default Header