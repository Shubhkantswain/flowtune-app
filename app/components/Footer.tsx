import React from 'react'
import { FaceBookIcon, InstagramIcon, TwitterIcon } from '~/Svgs'

function Footer() {
    return (
        <footer className="text-white mt-16">
            <div className="container mx-auto grid grid-cols-4 gap-4">
                {/* Company Column */}
                <div>
                    <h3 className="font-bold mb-3 text-xs">Company</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#" className="hover:underline text-xs">About</a></li>
                        <li><a href="#" className="hover:underline text-xs">Jobs</a></li>
                        <li><a href="#" className="hover:underline text-xs">For the Record</a></li>
                    </ul>
                </div>

                {/* Communities Column */}
                <div>
                    <h3 className="font-bold mb-3 text-xs">Communities</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#" className="hover:underline text-xs">For Artists</a></li>
                        <li><a href="#" className="hover:underline text-xs">Developers</a></li>
                        <li><a href="#" className="hover:underline text-xs">Advertising</a></li>
                        <li><a href="#" className="hover:underline text-xs">Investors</a></li>
                        <li><a href="#" className="hover:underline text-xs">Vendors</a></li>
                    </ul>
                </div>

                {/* Useful Links Column */}
                <div>
                    <h3 className="font-bold mb-3 text-xs">Useful links</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#" className="hover:underline text-xs">Support</a></li>
                        <li><a href="#" className="hover:underline text-xs">Free Mobile App</a></li>
                    </ul>
                </div>

                {/* Spotify Plans Column */}
                <div>
                    <h3 className="font-bold mb-3 text-xs">Flowtune Plans</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><a href="#" className="hover:underline text-xs">Premium Individual</a></li>
                        <li><a href="#" className="hover:underline text-xs">Premium Duo</a></li>
                        <li><a href="#" className="hover:underline text-xs">Premium Family</a></li>
                        <li><a href="#" className="hover:underline text-xs">Premium Student</a></li>
                        <li><a href="#" className="hover:underline text-xs">Spotify Free</a></li>
                    </ul>
                </div>
            </div>

            {/* Social Icons and Legal Links */}
            <div className="container mx-auto mt-6 flex justify-between items-center border-t border-[#1D1D1D] pt-4">
                <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-gray-300">
                        <InstagramIcon width="20" height="20" />
                    </a>
                    <a href="#" className="text-white hover:text-gray-300">
                        <TwitterIcon width="20" height="20" />
                    </a>
                    <a href="#" className="text-white hover:text-gray-300">
                        <FaceBookIcon width="20" height="20" />
                    </a>
                </div>
               
            </div>
        </footer>
    )
}

export default Footer