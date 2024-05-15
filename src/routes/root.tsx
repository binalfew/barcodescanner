import { Outlet } from "react-router-dom";
import "../styles/index.css";

export default function RootRoute() {
  return (
    <div className="min-h-full">
      <div className="py-10 mx-auto max-w-full sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
