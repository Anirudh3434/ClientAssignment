import AsyncStorage from '@react-native-async-storage/async-storage';

const storageMiddleware = store => next => action => {
    next(action);

    // Save the entire Redux state to Async Storage
    AsyncStorage.setItem('reduxState', JSON.stringify(store.getState()))
        .catch(error => console.error('Failed to save state to Async Storage:', error));
};

export default storageMiddleware;
