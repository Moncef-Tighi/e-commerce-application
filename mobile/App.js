import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListeCommandes from "./screen/ListeCommandes";
import DetailsInfoScreen from "./screen/Cart";

const Tab = createBottomTabNavigator();
function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Commande">
                <Tab.Screen name="Commande" component={ListeCommandes} />
                <Tab.Screen name="Cart" component={DetailsInfoScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
