import { getCookie, setCookie } from "../cookies.js";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userID, setUserID] = useState('');
    const [invalidUser, setInvalidUser] = useState(false);

    useEffect(() => {
        if (userID) {
            fetch(`http://localhost:3001/users/${userID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched employee data:", data);
                    const user = Array.isArray(data) ? data[0] : data;

                    if (user && user.id == userID) {
                      setInvalidUser(false);
                    }
                    else {
                      console.log('User Not Found!');
                      setInvalidUser(true);
                    }
                })
                .catch(() => {
                    setInvalidUser(true);
                });
        } else {
        }

        setCookie('USER_ID', userID, 30);
    }, [userID]);

    useEffect(() => {
      if (userID) {
          setCookie('USER_ID', userID, 30);
      }
  }, [userID]);

    return (
        <UserContext.Provider value={{ userID, setUserID, invalidUser}}>
            {children}
        </UserContext.Provider>
    );
}