import { AnimatePresence } from "framer-motion";
import { Suspense, lazy} from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import { auth } from "../utils/firebase";
import PublicRoute from "./PublicRoute";
import FullPageLoader from "./Loader/FullPageLoader";
const Login = lazy(() => import("../pages/login"));
const Chat = lazy(() => import("../pages/chat"));
const Register = lazy(() => import("../pages/register"));
const ForgetPassword = lazy(() => import("../pages/forgetPassword"));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
                <Route path="login" element={
                    <Suspense fallback={<div>Loading....</div>}
                    >
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    </Suspense>
                } />
                <Route path="register" element={
                    <Suspense fallback={<div>Loading....</div>}
                    >
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    </Suspense>
                } />
                <Route path="forget-password" element={
                    <Suspense fallback={<div>Loading....</div>}
                    >
                        <PublicRoute>
                            <ForgetPassword />
                        </PublicRoute>
                    </Suspense>
                } />
                <Route path="/"
                    element={
                        <Suspense fallback={<FullPageLoader />}>
                            <PrivateRoute >
                                <Chat />
                            </PrivateRoute>
                        </Suspense>
                    } />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes