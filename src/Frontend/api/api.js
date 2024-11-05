// src/Frontend/api/api.js
export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('https://your-firebase-url/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload image');
    }

    return await response.json(); // Return the response or handle it as needed
};

// Example of other exports
export const deleteItem = async (itemId) => {
    // Implementation for deleting an item
};

export const fetchSellerItems = async () => {
    // Implementation for fetching items
};
