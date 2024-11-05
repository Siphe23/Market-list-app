// src/Backend/Firebase/uploadImage.js

import { storage } from '../../Backend/Firebase/firebaseConfig'; // Import the storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary methods

const uploadImage = async (file) => {
  console.log('Uploading file:', file); // Log the file being uploaded
  try {
    // Create a reference to the storage location
    const fileRef = ref(storage, `images/${file.name}`);
    
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const url = await getDownloadURL(snapshot.ref); // Use snapshot.ref to get the URL
    console.log('File uploaded successfully. Download URL:', url); // Log the download URL
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow error to handle in SellersForm
  }
};

export default uploadImage;
