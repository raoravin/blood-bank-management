import {Navigate, useLocation} from "react-router-dom";
import Spinner from "../shared/Spinner";
import { useSelector } from "react-redux";



const ProtectedRoutes = ({loggedIn, children}) => {
    const {loading} = useSelector((state) => state.auth)

    const location = useLocation()
    
    if (loading) {
        // Render a loading spinner or component
        return <Spinner />;
      }
    
    if(!loggedIn) {
        return <Navigate to={location.pathname} replace />
    }
    return children;
};


export default ProtectedRoutes;