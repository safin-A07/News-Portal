import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const logOut = () => {
        return signOut(auth)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser , updatedData)
    }

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn ,
        loading ,
        setLoading

    }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>;


};

export default AuthProvider;