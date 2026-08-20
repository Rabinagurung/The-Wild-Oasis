import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 h-[calc(100vh-9rem)]">
      <SideNavigation />
      <div className="py-1 overflow-y-auto min-h-0">{children}</div>
    </div>
  );
}
