import React, {useState} from "react";

const Auth = ({errorMessage, onSubmit}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = event => {
        setEmail(event.target.value);
    };
    const handlePw = event => {
        setPassword(event.target.value);
    };

    const handleSignin = async (event) =>{
        event.preventDefault();
        onSubmit({email,password});
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            value={email}
                            onChange={handleEmail}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            value={password}
                            onChange={handlePw}
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        {errorMessage ? <p className="text-right mt-2" style = {{color:"#e74c3c"}}>{errorMessage}</p> : null}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-dark" onClick={handleSignin}>
                            Login
                        </button>
                        {/* <button type="submit" className="btn btn-primary" onClick={myest}>
                            Login
                        </button> */}
                    </div>
                    {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </div>
            </form>
        </div>
    );
}
export default Auth;
