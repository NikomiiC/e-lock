import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import history from "../customRoutes/history";


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

const signin = dispatch => async ({email, password}) => {
    // const navigate = useNavigate();
    try {
        const response = await serverAPI().post('/signin', {email, password});
        console.log("sign in : ", email);
        localStorage.setItem('token', response.data.token);
        console.log("token: ", response.data.token);
        localStorage.setItem('isLoggedIn', true);
        dispatch({type: 'signin', payload: response.data.token});
        history.push('/home');

    } catch (error) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
        console.log(error);
        //NavigateTo('/');
    }
};

const signout = dispatch => async () => {
    localStorage.clear();
    dispatch({type: 'signout'});
    history.push('/');
};


export const {Provider, Context} = createDataContext(
    authReducer, //note: reducer
    {signin, signout, clearErrorMessage}, //note: actions
    {token: null, errorMessage: '', isLoggedIn: false} //note: initial state
);