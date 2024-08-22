import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeStore } from './Store/Store'; 
import Home from './Component/Home';
import Saved from './Component/Saved';


const Stack = createStackNavigator();

const App: React.FC = () => {
    const [store, setStore] = useState<any>(null);

    useEffect(() => {
        const initStore = async () => {
            const initializedStore = await initializeStore();
            setStore(initializedStore);
        };

        initStore();
    }, []);

    if (!store) {
        return null; // Optionally return a loading spinner or message
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
          name="saved"
          component={Saved}
          options={{
            headerShown: false,
          }}
          />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
