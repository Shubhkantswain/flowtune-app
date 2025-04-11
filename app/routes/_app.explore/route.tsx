import { Outlet } from "@remix-run/react";
import NavigationTabs from "./_components/NavigationTabs";


export default function ExploreLayout() {
  return (
    <div className="flex flex-col">
      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Dynamic Content */}
      <Outlet />
    </div>
  );
}