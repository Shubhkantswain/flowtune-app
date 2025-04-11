import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import SearchBar from "../_app.search/_components/SearchBar";
import useSearchStore from "~/store/useSearchStore";
import Footer from "../../components/Footer";
import ArtistsGrid from "./_component/ArtistGrid";



export default function AppLayout() {
    const { searchQuery } = useSearchStore()
    const navigate = useNavigate()
    const location = useLocation()
    const tabs = [
        { label: "Tracks", pathname: "/search-results/tracks" },
        { label: "Playlists", pathname: "/search-results/playlists" },
        { label: "Users", pathname: "/search-results/users" },
        { label: "Podcasts", pathname: "/search-results/podcasts" }
    ];

    return (
        <>
            <div className="block md:hidden p-4 sm:p-6 md:p-8 -mb-10">
                <SearchBar />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 p-4 sm:p-6 md:p-8 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.label}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${location.pathname.includes(tab.pathname)
                            ? 'bg-white text-black'
                            : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                            }`}
                        onClick={() => navigate(`${tab.pathname}/${searchQuery}`)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <Outlet />

            <ArtistsGrid/>

            <Footer/>
        </>
    );
}
