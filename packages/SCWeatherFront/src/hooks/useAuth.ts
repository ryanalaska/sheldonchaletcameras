import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Storage from "../utils/storage";

const useAuth = ()=>useContext(AuthContext);

export const useInitializeAuth = ()=>{
    const {login, isInitialized} = useAuth();
    const initializeAuth = ()=>{
        if (isInitialized) return;
        
        const storageUser = Storage.getValue("AUTH");
        login(storageUser)
    }

    useEffect(()=>{
        initializeAuth()
    },[])
}

export default useAuth;