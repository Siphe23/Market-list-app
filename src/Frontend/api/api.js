
import { storage } from '../../Backend/Firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (imageFile) => {
    if (!imageFile) throw new Error('No image file provided');

    // Create a reference in Firebase Storage
    const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    
    // Upload the image
    await uploadBytes(imageRef, imageFile);
    
    // Get the download URL
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl; // This is the Firebase Storage URL
};
