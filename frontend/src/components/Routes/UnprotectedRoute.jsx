import {Navigate} from "react-router-dom";



const UnProtectedRoutes = ({loggedIn,user, emailVerified, children}) => {
    if(user && emailVerified == false) {
        return <Navigate to="/verify-otp" replace/>
    }
    if(user && emailVerified == true) {
        return <Navigate to="/home" replace/>
    }
    return children;
};


export default UnProtectedRoutes;