import { getCookie, setCookie } from "../cookies.js";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userID, setUserID] = useState(() => {
        return localStorage.getItem("USER_ID") || "";
      });

      useEffect(() => {
        if (userID) {
          localStorage.setItem("USER_ID", userID);
          setCookie("USER_ID", userID, 30);
        } else {
          localStorage.removeItem("USER_ID");
          setCookie("USER_ID", "", -1);
        }
      }, [userID]);

    useEffect(() => {
        console.log("Current userID:", userID);
        if (userID) {
            fetch(`http://localhost:3001/users/${userID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched user data:", data);
                    const user = Array.isArray(data) ? data[0] : data;

                    if (!user || user.id !== parseInt(userID)) {
                        setUserID("")
                    }
                })
                .catch((error) => {
                  console.error("Error fetching user data:", error);
                  setUserID("");
                });
            }
          }, [userID]);

    return (
        <UserContext.Provider value={{ userID, setUserID}}>
            {children}
        </UserContext.Provider>
    );
}