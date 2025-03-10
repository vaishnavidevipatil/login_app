import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <header className="header">My Dashboard Header</header>
      <div className="content">
        <Outlet /> {/* This will render the Dashboard, About, etc. */}
      </div>
    </div>
  );
}

export default MainLayout;
