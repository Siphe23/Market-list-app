// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './Frontend/redux/store'; // Import the store as a default export
import App from './App'; // Import your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}> {/* Wrap your App with Provider */}
        <App />
    </Provider>
);
