import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import history from "../customRoutes/history";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";


const authReducer = (state, action) => {

    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload, isLoggedIn: true};
        case 'clear_error_messgage':
            return {...state, errorMessage: ''};
        case 'signout':
            return {token: null, errorMessage: '', isLoggedIn: false};
        default:
            return state;
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_messgage'})
}

// const tryLocalSignin = dispatch => async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         dispatch({ type: 'signin', payload: token });
//         navigate('mainFlow');
//     }
//     else {
//         navigate('Signin');
//     }
// };
/**
 * make api request to sign up with email and password
 * if sign up successfully, modify state and say authenticated
 * else <FAIL>, reflect an error message
 */
// const signup = dispatch => async ({ email, password, username }) => {
//     try {
//         const response = await serverAPI.post('/signup', { email, password, username });
//         await localStorage.setItem('token', response.data.token);
//         dispatch({ type: 'signin', payload: response.data.token });
//         console.log("test");
//     } catch (error) {
//         dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
//     }
// };


function roleCheck(email) {
    const adminEmail = "admin@posebuddy.com";
    return (email === adminEmail);
}

/**
 * make api request to sign  in with email and password
 * if sign in successfully, modify state
 * else <FAIL>, reflect an error message
 */
// const signin = dispatch => async ({ email, password }) => {
//     // const navigate = useNavigate();
//     try {
//         if (!roleCheck(email)) {
//             dispatch({
//                 type: 'add_error',
//                 payload: 'Invalid User'
//             });
//         }
//         else {
//             const response = await serverAPI().post('/signin', { email, password });
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('isLoggedIn', true);
//             dispatch({ type: 'signin', payload: response.data.token });
//             history.push('/home');
//         }
//
//     } catch (error) {
//         dispatch({
//             type: 'add_error',
//             payload: 'Something went wrong with sign in'
//         });
//         //NavigateTo('/');
//     }
// };

/**
 * backend response after signin and signup
 * {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiZmJiODFmZDZiZTVmNzNiODBiYzkiLCJpYXQiOjE3MTEwMTI3OTJ9.7ik91Dklf9EHwhowwVYVmox775FT7nhzHsMqWWA5M5g",
 *     "user": {
 *         "email": "test2@gmail.com",
 *         "password": "$2b$10$eJiExxsccOKOjplJPQ/yN.Eyil6AzhASsULPdGOw5/sGZdefQLGi2",
 *         "username": "u2",
 *         "role": "u",
 *         "gender": null,
 *         "dob": null,
 *         "feedback_list": [],
 *         "trn_list": [],
 *         "_id": "65fbfbb81fd6be5f73b80bc9",
 *         "__v": 0
 *     }
 * }
 * todo: remove unnecessary role check for sign in
 */

const signin = dispatch => async ({email, password}) => {
    // const navigate = useNavigate();
    try {
        const response = await serverAPI().post('/signin', {email, password});
        console.log("sign in : ", email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', response.data.user.role);
        dispatch({type: 'signin', payload: response.data.token});
        history.push('/');
        if (localStorage.getItem('role') === "u") {
            window.location.replace('/user-home');
        } else if (localStorage.getItem('role') === "admin") {
            window.location.replace('/admin-home')
        }

    } catch (error) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
        alert(error);
    }
};

const signup = dispatch => async ({ email, password, username }) => {
    try {
        const response = await serverAPI.post('/signup', { email, password, username });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user);
        // console.log("token: ", response.data.token);
        localStorage.setItem('isLoggedIn', true);
        dispatch({ type: 'signin', payload: response.data.token }); //can re use
        history.push('/');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
    }
};

const signout = dispatch => async () => {
    localStorage.clear();
    dispatch({type: 'signout'});
    history.push('/');
    window.location.replace('/');
};


export const {Provider, Context} = createDataContext(
    authReducer, //note: reducer
    {signin, signout, clearErrorMessage, signup}, //note: actions
    {token: null, errorMessage: '', isLoggedIn: false, userType: ''} //note: initial state
);