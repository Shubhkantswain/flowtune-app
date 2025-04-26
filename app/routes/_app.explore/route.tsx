import { Outlet } from "@remix-run/react";
import NavigationTabs from "./_components/NavigationTabs";


export default function ExploreLayout() {
  return (
    <div className="flex flex-col  max-w-[90rem] mx-auto">
      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Dynamic Content */}
      <Outlet />
    </div>
  );
}