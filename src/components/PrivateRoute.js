import React, { useLayoutEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import FullPageLoader from './Loader/FullPageLoader';
import { useNavigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        setIsLoading(true);
        // Set up Firebase authentication listener to track user's login status
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                navigate("/login");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (isLoading) {
        return <FullPageLoader />;
    }

    return children;
}

export default PrivateRoute