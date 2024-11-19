
import DashboardHome from "@/components/Home";
import SideNav from "@/components/side-nav";

export default function Home() {
  return (
    <div className="flex flex-row h-screen bg-white">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1  lg:p-8 overflow-auto">
        <DashboardHome />
      </div>
    </div>
  );
}
