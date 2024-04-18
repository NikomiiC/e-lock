import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import serviceUtil from "../service/serviceUtil";

const lockerReducer = (state, action) => { //todo: to interact with components, basically the state changing. Actually u can reuse same type for different function(meaning in functions dispatch same case ** see comments in getLocker function around line 52, i am just put here for better understanding), as long as their return object are the same. ie, 'getLockers', 'getLocker', 'addLockers', 'deleteLockers'
    switch (action.type) {
        case 'getLockers':
            return {errorMessage: '', result: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        // case 'xxx':
        //     return action.payload;
        default:
            return state;
    }
};

const getLockers = dispatch => async () => {
    try {
        const response = await serverAPI().get('/all_lockers'); //axios set base to localhost alr, just paste corresponding backend end points to function
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            //success, return array of collections
            dispatch({type: 'getLockers', payload: response.data.payload}); //type should same as the reducer case
            //console.log(response.data)
        } else {
            //fail
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload //depends on backend, some fail call will return payload. Keep it in this form first
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load lockers'
        });
    }
};

const getLockerById = dispatch => async (id) => {
    try {
        const response = await serverAPI().get('/locker/' + id);
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            // dispatch({type: 'getLockers', payload: response.data.payload});
            // console.log(response.data.payload);
            return {payload: response.data.payload}
        } else {
            //fail
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload 
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load locker'
        });
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}

const addLockers = dispatch => async (document) => {
    try {
        if (!document) {
            dispatch({
                type: 'add_error',
                payload: 'Please provide required data'
            });
        }
        const response = await serverAPI().post('/create_lockers', document);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg
            });

        }
        else{window.location.reload();} //reload current page
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to add locker, please provide required data'
        });
    }
};

const deleteLockers = dispatch => async (document) => {
    try {
        if (!document) {
            dispatch({
                type: 'add_error',
                payload: 'Unable to delete'
            });
        }
        const response = await serverAPI().post('/delete_locker');
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to delete this lockers'
        });
    }
};

export const {Provider, Context} = createDataContext(
    lockerReducer, //reducer
    {getLockers, clearErrorMessage, addLockers, deleteLockers, getLockerById}, //todo: actions, implement functions and add to exports function name
    {errorMessage: '', result: null} // initial state
);
