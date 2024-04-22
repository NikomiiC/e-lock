import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import serviceUtil from "../service/serviceUtil";

const transactionReducer = (state, action) => { //todo: to interact with components, basically the state changing. Actually u can reuse same type for different function(meaning in functions dispatch same case ** see comments in getLocker function around line 52, i am just put here for better understanding), as long as their return object are the same. ie, 'getLockers', 'getLocker', 'addLockers', 'deleteLockers'
    switch (action.type) {
        case 'getTransactions':
            return { errorMessage: '', result: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

const getAllTransactions = dispatch => async () => {
    try {
        const response = await serverAPI().get('/all_transactions');
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            return { payload: response.data.payload }
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load transactions'
        });
    }
};

const getTransactionsByUser = dispatch => async (id, status) => {
    try {
        const response = await serverAPI().get('/user_all_transactions', {
            params: {
                status: status,
                user_id: id
            }
        });
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({type: 'getTransactions', payload: response.data.payload});
            console.log(response.data.payload);
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: "Failed to load user's transactions"
        });
    }
};

const clearErrorMessageTrans = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const addTransaction = dispatch => async (document) => {
    try {
        if (!document) {
            return {payload: "Please provide the required data"}
        }
        const response = await serverAPI().post('/create_transaction', document);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            return {payload: response.data.msg}
        }
        else { 
            return {payload: "Success"}
        } //reload current page
    } catch (err) {
        // dispatch({
        //     type: 'add_error',
        //     payload: 'Failed to add transaction, please provide required data'
        // });
        window.alert("Booking failed because you have already made a maximum of two bookings per day!");
        window.location.replace('/user-home');
    }
};

const updateTransactionById = dispatch => async (id) => {
    try {
        const response = await serverAPI().post('/update_location' + id);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to update this transaction'
        });
    }
};

export const { Provider, Context } = createDataContext(
    transactionReducer, //reducer
    { getAllTransactions, getTransactionsByUser, clearErrorMessageTrans, addTransaction, updateTransactionById }, //todo: actions, implement functions and add to exports function name
    { errorMessage: '', result: null } // initial state
);
