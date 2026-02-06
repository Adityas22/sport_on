import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div>
    <main>
      <Outlet />
    </main>
  </div>
);
export default AdminLayout;
