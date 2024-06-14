import { Navigate } from "react-router-dom";
import { verifyToken } from "../services/home.service";

function Protected({ children }) {

    var token = localStorage.getItem('token') || '';

    if(token !== '') {

        verifyToken(token).then((r)=> {
            if(r.code === '1'){
                localStorage.setItem('user', JSON.stringify([{"name":r.data[0].name}]));
            }else{
                return <Navigate to={"/login"} replace />;
                
            }
        });

        return children;
    }
    else {
        return <Navigate to={'/login'} replace />
    }

  
}

export default Protected;
