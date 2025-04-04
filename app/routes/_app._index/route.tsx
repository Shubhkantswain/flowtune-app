import { useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hooks/auth";
import TrackSection from "./_components/TrackSection";
import { Track } from "gql/graphql";
import { createGraphqlClient } from "~/clients/api";
import { getFeedTracksQuery } from "~/graphql/queries/track";
import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { MetaFunction } from "@remix-run/cloudflare";
import { useEffect } from "react";
import usePlaylistStore from "~/store/usePlaylistStore";
import { getTitle } from "~/utils";

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

    if (!token) {
      return redirect("/ft/signin")
    }

    const graphqlClient = createGraphqlClient(token);
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery);

    return getFeedTracks || []; // Expecting an array of `Track`
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array to match the expected type
  }
}

const AppleMusicHomepage: React.FC = () => {
  const tracks = useLoaderData<Track[]>(); // Ensure type safety
  const { setActiveSectionIndex } = usePlaylistStore();

  const sectionSize = 8;
  const trackSections = [
    tracks.slice(0, sectionSize),
    tracks.slice(sectionSize, sectionSize * 2),
    tracks.slice(sectionSize * 2, sectionSize * 3),
  ];

  useEffect(() => {
    setActiveSectionIndex(-1);
  }, []);

  return (
    <>
      {/* TRACK SECTIONS */}
      {trackSections.map((section, index) => (
        <TrackSection key={index} tracks={section} index={index} title={getTitle(index)} />
      ))}

      <footer className="text-white py-6 px-4 text- mt-10">
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
            <h3 className="font-bold mb-3 text-xs">Spotify Plans</h3>
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
        <div className="container mx-auto mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
          <div className="text-xs text-gray-400 space-x-2">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Safety & Privacy Center</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">About Ads</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <span>© 2025 Spotify AB</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppleMusicHomepage;