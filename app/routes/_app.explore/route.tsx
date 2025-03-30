import { Link, Outlet, useLocation } from "@remix-run/react";

export default function ExploreLayout() {
   const location = useLocation();
   const navItems = [
      { name: "Tracks", path: "/explore" },
      { name: "Playlists", path: "/explore/playlists" },
   ];

   return (
      <div className="flex flex-col">
         {/* Header with Two Items on Left */}
         <header className="flex gap-3 p-4 sm:p-6 md:p-8">
            {navItems.map((item) => (
               <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${location.pathname === item.path ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                     }`}
               >
                  {item.name}
               </Link>
            ))}
         </header>

         {/* Page Content */}
         <Outlet />
      </div>
   );
}