import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import Quiz from './telas/Quiz';
import Cadastros from './telas/Cadastros';
import Resumo from './telas/Resumo';

/* Help:
https://reactnavigation.org/docs/hello-react-navigation
https://reactnavigation.org/docs/native-stack-navigator/#headerbackvisible


// pacotes para instalar: 
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
*/


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false,  }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Cadastros" component={Cadastros} options={{ headerBackVisible: true , animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Resumo" component={Resumo} options={{ headerBackVisible: false, headerBackTitleVisible: false, title: 'Esta é tela 3', animation: 'fade' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


