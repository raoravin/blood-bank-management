import {Navigate} from "react-router-dom";



const UnProtectedRoutes = ({loggedIn, emailVerified, children}) => {
    if(loggedIn && emailVerified == false) {
        return <Navigate to="/verify-otp" replace/>
    }
    if(loggedIn && emailVerified == true) {
        return <Navigate to="/home" replace/>
    }

    return children;
};


export default UnProtectedRoutes;