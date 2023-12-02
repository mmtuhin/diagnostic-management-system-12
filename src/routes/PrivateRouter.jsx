
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <h1>Loading...........................</h1>
    }

    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRouter;