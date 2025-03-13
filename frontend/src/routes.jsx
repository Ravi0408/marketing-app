import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile,Sessions,  } from "@/pages/dashboard";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      
      {
        icon: <HomeIcon {...icon} />,
        visible:true,
        
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        visible:true,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },

      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        visible:true,
        name: "Campaigns",
        path: "/sessions",
        element: <Sessions />,
        
      },

      
    ],
  },
  
];

export default routes;
