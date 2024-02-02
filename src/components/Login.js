import React, { useContext } from "react";
import Auth from "./Auth";
import { Context } from "../context/AuthContext";


const Login = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);
    return (
        <div onLoad={clearErrorMessage}>
            <div className="Auth-form-container">
                <h1 class="text-center" className="PoseBuddyTitle">eLockHub</h1>
                <Auth
                    errorMessage={state.errorMessage}
                    onSubmit={signin}
                />
            </div>

        </div>
    );
};

export default Login;