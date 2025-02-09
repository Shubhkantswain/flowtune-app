import React from 'react'

function RightControllers() {
    return (
        <div className="flex items-center justify-end flex-1 md:w-1/3 space-x-2">
            {/* Play Button for Small Screens (Visible Only on Small Screens) */}
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            </button>

            {/* Heart Icon for Small Screens (Visible Only on Small Screens) */}
            <button className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="28" viewBox="0 0 24 24"><defs><path id="ic_action_favorite-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z M12,18.797 C9.077,16.832 4,13.186 4,9 C4,6.794 5.794,5 8,5 C9.263,5 10.429,5.592 11.198,6.625 C11.575,7.131 12.425,7.131 12.802,6.625 C13.571,5.592 14.737,5 16,5 C18.206,5 20,6.794 20,9 C20,13.186 14.923,16.832 12,18.797 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_favorite-a" fill="currentColor"></use></g></svg>
            </button>

            {/* Volume Control (Hidden on Small Screens) */}
            <div className="hidden md:flex items-center justify-end">
                <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightControllers