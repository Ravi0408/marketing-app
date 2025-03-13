import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; 
  }
}

export function decodeToken(token) {
  try {
    if(!token) return null
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}



// Helper function to get remaining time until token expiration
export function getRemainingTime(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingTimeInSeconds = decoded.exp - currentTime;

    if (remainingTimeInSeconds <= 0) {
      return "Expired";
    }

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(remainingTimeInSeconds / 3600);
    const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const seconds = remainingTimeInSeconds % 60;
    // console.log(`${hours}h ${minutes}m ${seconds}s`)
    return `${hours}h ${minutes}m ${seconds}s`;
  } catch (error) {
    console.error("Failed to calculate remaining time:", error);
    return "Invalid token";
  }
}

export function RemainingSubscriptionDays(expiresAt) {
  const currentDate = new Date(); // Get the current date
  const expiryDate = new Date(expiresAt); // Convert expiresAt to a Date object

  // Calculate the difference in milliseconds
  const differenceInMillis = expiryDate - currentDate;

  // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
  const remainingDays = Math.ceil(differenceInMillis / (24 * 60 * 60 * 1000));

  // If remainingDays is negative, the subscription has expired
  return remainingDays > 0 ? remainingDays : 0;
}
