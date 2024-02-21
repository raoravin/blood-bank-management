import { useSelector } from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import Spinner from "../shared/Spinner";



const UnProtectedRoutes = ({loggedIn, children}) => {
    const {loading} = useSelector((state) => state.auth)

    // const location = useLocation()
    
    if (loading) {
        // Render a loading spinner or component
        return <Spinner />;
      }
    if(loggedIn) {
        return <Navigate to="/" replace/>
    }
    return children;
};


export default UnProtectedRoutes;