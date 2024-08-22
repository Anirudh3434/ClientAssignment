import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import addressReducer from './Slice';
import storageMiddleware from './Middleware';

// Create and export an async function to initialize the store
export async function initializeStore() {
    const store = configureStore({
        reducer: {
            address: addressReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(storageMiddleware),
    });

    // Load the initial state from Async Storage
    try {
        const serializedState = await AsyncStorage.getItem('reduxState');
        if (serializedState !== null) {
            store.dispatch({ type: '@@INIT', payload: JSON.parse(serializedState) });
        }
    } catch (err) {
        console.error('Failed to load state from Async Storage:', err);
    }

    return store;
}
