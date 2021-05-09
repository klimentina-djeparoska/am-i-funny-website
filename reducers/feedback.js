import * as actionTypes from '../actions/leave-feedback';

const initialState = {
    result: null,
    loading: true
};

const feedback = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_FEEDBACK:
            return { ...state, loading: true, result: undefined };
        case actionTypes.SAVE_FEEDBACK_SUCCESS:
            return { ...state, loading: false, result: action.payload };
        case actionTypes.SAVE_FEEDBACK_FAILURE:
            return { ...state, loading: false, result: undefined, error: action.error };
        default:
            return state;
    }
};

export default feedback;
