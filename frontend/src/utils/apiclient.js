import axios from "axios";
import { isTokenExpired } from "./utils";
const getToken = () => {
    console.log("token",localStorage.getItem('token'))
    return localStorage.getItem('token'); // Adjust if using a different storage mechanism
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY,
  // baseURL: "http://192.168.181.101:4000"  ,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${getToken()}` // Include Bearer token
//   },
});

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Get the latest token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
// Add an interceptor to handle expired sessions
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Handle session expiration
    if (error?.response?.data?.expired && isTokenExpired(getToken)) {
            alert("Session expired. Please log in again.");
            console.log("appclient logout")
            // setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // navigate("/auth/sign-in");
        }
        
    // if (error.response && error.response.data.expired) {
    //   // Clear local storage
    // //   const { setUser } = useUser();
    // //   setUser(null); 
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");

    //   // Navigate to login page
    // //   const navigate = useNavigate();
    // //   navigate("/auth/sign-in");

    //   alert("Session expired. Please log in again.");
    // }

    // Reject the promise to propagate the error
    return Promise.reject(error);
  }
);

export default apiClient;
