import {Navigate} from "react-router-dom";



const EmailRoute = ({loggedIn, emailVerified, children}) => {
    if( emailVerified == true) {
        return <Navigate to="/home" replace/>
    }
    return children;
};


export default EmailRoute;