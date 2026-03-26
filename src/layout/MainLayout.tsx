import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname.includes("/projects/");

  return (
    <>
      {!hideHeader && <Header />}
      <div className="min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
