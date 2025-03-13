import PropTypes from "prop-types";
import { Avatar, Button, Switch, Typography } from "@material-tailwind/react";
import { setSidenavColor, setSidenavType, setFixedNavbar, useMaterialTailwindController } from "@/context";
import React from "react";
import { useUser } from "@/context/usercontext";
export function PlatformSettings({ img, name, message, action }) {
      const [controller, dispatch] = useMaterialTailwindController();
      const { user, setUser,updateLocalPreference } = useUser();
  const { sidenavColor, sidenavType, fixedNavbar } =
    controller;
    const sidenavColors = {
        white: "from-gray-100 to-gray-100 border-gray-200",
        dark: "from-black to-black border-gray-200",
        green: "from-green-400 to-green-600",
        orange: "from-orange-400 to-orange-600",
        red: "from-red-400 to-red-600",
        pink: "from-pink-400 to-pink-600",
      };
    const updateUserPreferences = (key, value) => {
        // const updatedPreferences = { ...controller, [key]: value };

        // // Update the local state
        // dispatch({ type: key.toUpperCase(), value });
        const preferences = {
            [key]: value, // Dynamically set the key and value
        };
        // Send update to backend
        updateLocalPreference(key,value)
    };
    const handleSidenavColorChange = (color) => {
        setSidenavColor(dispatch, color)
        updateUserPreferences("sidenavColor", color);
    };
    
    const handleSidenavTypeChange = (type) => {
        setSidenavType(dispatch, type)
        updateUserPreferences("sidenavType", type);
    };  
    
    const handleFixedNavbarChange = () => {
        setFixedNavbar(dispatch, !fixedNavbar)
        updateUserPreferences("fixedNavbar", !fixedNavbar);
    };
  return (
    <div className=" flex items-center justify-center gap-4">
      <div className="flex items-center gap-4">
      <div className="py-4 px-5">
          <Typography variant="small" color="gray">
            If This dosent work, Please sign-in again!
          </Typography>
        <div className="mb-4">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                // onClick={() => setSidenavColor(dispatch, color)}
                onClick={() => handleSidenavColorChange(color)}
              />
            ))}
          </div>
        </div>
        <div className="">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <div className=" flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
            //   onClick={() => setSidenavType(dispatch, "dark")}
              onClick={() => handleSidenavTypeChange("dark")}
              >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
            //   onClick={() => setSidenavType(dispatch, "transparent")}
              onClick={() => handleSidenavTypeChange("transparent")}
              >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
            //   onClick={() => setSidenavType(dispatch, "white")}
              onClick={() => handleSidenavTypeChange("white")}
            >
              White
            </Button>
          </div>
        </div>
        <div className="">
          {/* <hr /> */}
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
            //   onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
              onChange={() => handleFixedNavbarChange(!fixedNavbar) 
                }
            />
          </div>
          {/* <hr /> */}
          
        </div>
      </div>
      </div>
    </div>
  );
}


PlatformSettings.displayName = "/src/widgets/cards/platform-settings.jsx";

export default PlatformSettings;
