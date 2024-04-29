import {Navigate} from "react-router-dom";



const UnProtectedRoutes = ({loggedIn,user, emailVerified, children}) => {
    // if(user == null) {
    //     return <Navigate to="/login" replace/>
    // }
    // if(loggedIn && emailVerified == false) {
    //     return <Navigate to="/verify-otp" replace/>
    // }
    if(loggedIn && emailVerified == true) {
        return <Navigate to="/home" replace/>
    }
    return children;
};


export default UnProtectedRoutes;