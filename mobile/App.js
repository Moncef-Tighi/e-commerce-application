import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListeCommandes from "./screens/ListeCommandes";
import Cart from "./screens/Cart";

const Tab = createBottomTabNavigator();
function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Articles">
                <Tab.Screen name="Articles" component={ListeCommandes} />
                <Tab.Screen name="Cart" component={Cart}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;