import React from 'react'
import { createContext } from 'react';
import { useContext } from 'react';
export const AuthContext = createContext();
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Effect to observe the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (authUser) => {
                setUser(authUser);
            });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const value = {
        user,
        signUp,
        signIn,
        logOut,
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider