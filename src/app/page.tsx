
import DashboardHome from "@/components/Home";
import SideNav from "@/components/side-nav";

export default function Home() {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <DashboardHome />
      </div>
    </div>
  );
}
