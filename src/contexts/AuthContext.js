import React, { useEffect, useState, createContext, useContext  } from 'react'
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";


export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Initially the value of user will be null, so if properties of the object anywhere in the child 
    // component is accessed it will throw an error, to avoid that we dont mount child components
    // until the user is set in onAuthstatechanged.
    const [loading, setLoading] = useState(true);

    // Effect to observe the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (authUser) => {
                setUser(authUser);
                setLoading(false)
            });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const value = {
        user,
        signUp,
        signIn,
        logOut,
    }
    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
}

export default AuthProvider