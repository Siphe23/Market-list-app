// src/redux/reducers/imageReducer.js
import { UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE } from '../actions/imageActions';

const initialState = {
    imageUrl: '',
    error: null,
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, imageUrl: action.payload, error: null };
        case UPLOAD_IMAGE_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default imageReducer;
