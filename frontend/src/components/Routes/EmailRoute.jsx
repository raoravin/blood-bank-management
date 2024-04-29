import {Navigate} from "react-router-dom";



const EmailRoute = ({loggedIn,user, emailVerified, children}) => {
    if(user && emailVerified == true) {
        return <Navigate to="/home" replace/>
    }
    if(!user) {
        return <Navigate to="/register" replace/>
    }
    return children;
};


export default EmailRoute;