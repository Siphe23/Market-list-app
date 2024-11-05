// src/redux/actions/imageActions.js
import { storage } from '../../Backend/Firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Action types
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

// Action creators
export const uploadImageSuccess = (imageUrl) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: imageUrl,
});

export const uploadImageFailure = (error) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
});

// Upload image function
export const uploadImage = (imageFile) => async (dispatch) => {
    if (!imageFile) {
        dispatch(uploadImageFailure('No image file provided'));
        return;
    }

    const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    try {
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        dispatch(uploadImageSuccess(imageUrl));
    } catch (error) {
        console.error('Error uploading image:', error);
        dispatch(uploadImageFailure('Image upload failed'));
    }
};
