import React from 'react'

function TrackCollectionsCover() {
    return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0">
            {/* Gradient background with blur */}
            <div className="absolute inset-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600 to-cyan-400 opacity-50 blur-2xl" />
            </div>

            {/* Heart icon with its own gradient */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {/* <Heart className="w-24 h-24 md:w-32 md:h-32 text-cyan-400" fill="currentColor" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#25d1da"></use></g></svg>

                    <div className="absolute inset-0 blur-md">
                        {/* <Heart className="w-24 h-24 md:w-32 md:h-32 text-purple-500" fill="currentColor" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#25d1da"></use></g></svg>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackCollectionsCover