import {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export default UserProvider;