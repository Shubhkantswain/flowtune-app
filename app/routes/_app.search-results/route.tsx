import { Outlet, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import SearchBar from "../_app.search/_components/SearchBar";
import useSearchStore from "~/store/useSearchStore";
import Footer from "../../components/Footer";
import ArtistsGrid from "./_component/ArtistGrid";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useEffect } from "react";


export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const cookieHeader = request.headers.get("Cookie");

        // Parse the cookie manually
        const cookies = Object.fromEntries(
            (cookieHeader || "")
                .split("; ")
                .map((c) => c.split("="))
                .map(([key, ...value]) => [key, value.join("=")])
        );

        // Extract the `__FlowTune_Token_server` cookie
        const token = cookies["__FlowTune_Token_server"];

        return token ? true : false

    } catch (error) {
        console.error("Error fetching tracks:", error);
        return []; // Return an empty array to match the expected type
    }
}

export default function AppLayout() {
    const isAuthenticated = useLoaderData()
    const { searchQuery } = useSearchStore()
    const navigate = useNavigate()
    const location = useLocation()
    const tabs = [
        { label: "Tracks", pathname: "/search-results/tracks" },
        { label: "Playlists", pathname: "/search-results/playlists" },
        { label: "Users", pathname: "/search-results/users" },
        { label: "Podcasts", pathname: "/search-results/podcasts" }
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem("__FlowTune_Token", "")
        }
    }, [isAuthenticated])

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
                            : 'bg-[#292a2a] hover:bg-[#5D5E5E] text-gray-300'
                            }`}
                        onClick={() => navigate(`${tab.pathname}/${searchQuery}`)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <Outlet />

            <ArtistsGrid />

            <Footer />
        </>
    );
}
