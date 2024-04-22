import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import serviceUtil from "../service/serviceUtil";

const pricingReducer = (state, action) => {
    switch (action.type) {
        case 'getPricing':
            return { errorMessage: '', result: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        // case 'xxx':
        //     return action.payload;
        default:
            return state;
    }
};

const getAllPricing = dispatch => async () => {
    try {
        const response = await serverAPI().get('/all_pricing');
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            return { prices: response.data.payload }
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to retrieve pricing'
        });
    }
};

const getPricingById = dispatch => async (id) => {
    try {
        const response = await serverAPI().get('/pricing/' + id);
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            return { priceById: response.data.payload }
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load lockers'
        });
    }
};

const clearErrorMessagePrice = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const addPricing = dispatch => async (document) => {
    try {
        if (!document) {
            dispatch({
                type: 'add_error',
                payload: 'Please provide required data'
            });
        }
        const response = await serverAPI().post('/create_pricing', document);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg
            });

        }
        else { window.location.reload(); } //reload current page
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to add locker, please provide required data'
        });
    }
};

const updatePricingById = dispatch => async (id) => {
    try {
        const response = await serverAPI().post('/update_pricing' + id);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to update this location'
        });
    }
};

export const { Provider, Context } = createDataContext(
    pricingReducer, //reducer
    { getAllPricing, getPricingById, clearErrorMessagePrice, addPricing, updatePricingById }, //todo: actions, implement functions and add to exports function name
    { errorMessage: '', result: null } // initial state
);
