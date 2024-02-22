import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import FullPageLoader from './Loader/FullPageLoader';

const PublicRoute = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        setIsLoading(true);
        // Set up Firebase authentication listener to track user's login status
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigate("/");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <FullPageLoader />;
    }

    return children;
}

export default PublicRoute