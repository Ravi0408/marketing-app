import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import React, { useEffect } from "react";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useUser } from "@/context/usercontext";
import { useNavigate } from "react-router-dom";
export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const navigate = useNavigate();
  const [token,setToken]=React.useState(localStorage.getItem("token"))
  const [submodal,setSubmodal]=React.useState(false)
  const [expirydate,setExpirydate]=React.useState(null)
  const _handleOpen = React.useCallback(
    () => {
      setSubmodal(!submodal)
      },
    [submodal])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/auth/sign-in");
    }
   
    
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={"/img/favicon1.png"}
 
        brandName="marketing app"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar token={token}/>

        
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
