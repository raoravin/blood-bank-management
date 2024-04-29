import {Navigate, useLocation} from "react-router-dom";
import Login from "../../pages/auth/Login";



const ProtectedRoutes = ({loggedIn, children}) => {
    const location = useLocation;

    if(!loggedIn) {
        return <Navigate to={location.pathname} />
    }
    return children
};


export default ProtectedRoutes;