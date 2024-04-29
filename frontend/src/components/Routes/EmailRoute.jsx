import {Navigate} from "react-router-dom";



const EmailRoute = ({loggedIn, emailVerified, children}) => {
    if( emailVerified == true) {
        return <Navigate to="/home" replace/>
    }
    if( emailVerified == null) {
        return <Navigate to="/register" replace/>
    }
    return children;
};


export default EmailRoute;