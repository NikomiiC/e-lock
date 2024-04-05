import createDataContext from "./createDataContext";
import serverAPI from "../api/serverAPI";
import serviceUtil from "../service/serviceUtil";

const locationReducer = (state, action) => { 
    switch (action.type) {
        case 'getLocations':
            return { errorMessage: '', result: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

const getLocations = dispatch => async () => {
    try {
        const response = await serverAPI().get('/all_locations');
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({ type: 'getLocations', payload: response.data.payload });
            // console.log(response.data.payload)
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load locations'
        });
    }
};

const getLocationById = dispatch => async (id) => {
    try {
        const response = await serverAPI().get('/location' + id);
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({ type: 'getLocation', payload: response.data.payload });
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load location'
        });
    }
};

const getLocByLonLat = dispatch => async (lon, lat) => {
    try {
        const response = await serverAPI().get('/locations' + "/" + lon + "/" + lat);
        if (serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({ type: 'getLocation', payload: response.data.payload });
        } else {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Failed to load location'
        });
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const addLocation = dispatch => async (document) => {
    try {
        if (!document) {
            dispatch({
                type: 'add_error',
                payload: 'Please provide required data'
            });
        }
        const response = await serverAPI().post('/create_location', document);
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

const deleteLocation = dispatch => async (id) => {
    try {
        const response = await serverAPI().post('/delete_location' + id);
        if (!serviceUtil.responseCodeCheck(response.data.code)) {
            dispatch({
                type: 'add_error',
                payload: response.data.msg + response.data.payload
            });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Unable to delete this location'
        });
    }
};

const updateLocation = dispatch => async (id) => {
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
            payload: 'Unable to update this location'
        });
    }
};

export const { Provider, Context } = createDataContext(
    locationReducer, //reducer
    { getLocations, clearErrorMessage, addLocation, deleteLocation, getLocationById, updateLocation, getLocByLonLat }, //todo: actions, implement functions and add to exports function name
    { errorMessage: '', result: null } // initial state
);
