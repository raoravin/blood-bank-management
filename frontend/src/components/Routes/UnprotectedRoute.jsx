import {Navigate} from "react-router-dom";



const UnProtectedRoutes = ({loggedIn, children}) => {
    if(loggedIn) {
        return <Navigate to="/home" replace/>
    }
    return children;
};


export default UnProtectedRoutes;