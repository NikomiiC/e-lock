import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import serviceUtil from "../service/serviceUtil";

const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'getTransactions':
            return {errorMessage: '', result: action.payload};
        case 'getTransaction':
            return {errorMessage: '', result: action.payload};
        case 'addTransaction':
            return {errorMessage: '', result: action.payload};
        case 'deleteTransaction':
            return {errorMessage: '', result: action.payload};
        case 'updateTransaction':
            return {errorMessage: '', result: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        default:
            return state;
    }
};

const getTransactions = dispatch => async () => {
    try {
        const response = await serverAPI().get('/all_transactions');
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({type: 'getTransactions', payload: response.data.payload});
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

const getTransaction = dispatch => async (id) => {
    try {
        const response = await serverAPI().get('/all_transactions');
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({type: 'getTransaction', payload: response.data.payload});
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load transaction'
        });
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}

const addTransaction = dispatch => async (document) => {
    try {
        if (!document) {
            dispatch({
                type: 'add_error',
                payload: 'Please provide required data'
            });
        }
        const response = await serverAPI().post('/create_transaction', document);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg
            });
        } else {
            window.location.reload(); // Reload current page
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to add transaction, please provide required data'
        });
    }
};

const deleteTransaction = dispatch => async (id) => {
    try {
        if (!id) {
            dispatch({
                type: 'add_error',
                payload: 'Unable to delete'
            });
        }
        const response = await serverAPI().delete('/delete_transaction' + id);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to delete this transaction'
        });
    }
};

const updateTransaction = dispatch => async (id, action, document) => {
    try {
        if (!id || !action || !document) {
            dispatch({
                type: 'add_error',
                payload: 'Unable to update'
            });
        }
        const response = await serverAPI().post(`/update_transaction/${id}`, { action, doc: document });
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

export const {Provider, Context} = createDataContext(
    transactionReducer,
    {getTransactions, clearErrorMessage, addTransaction, deleteTransaction, updateTransaction, getTransaction},
    {errorMessage: '', result: null}
);
