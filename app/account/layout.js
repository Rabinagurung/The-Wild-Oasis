import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 lg:gap-12 lg:h-[calc(100vh-9rem)]">
      <SideNavigation />
      <div className="py-1 lg:overflow-y-auto lg:min-h-0">{children}</div>
    </div>
  );
}
