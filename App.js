import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import Quiz from './telas/Quiz';
import Cadastros from './telas/Cadastros';
import Resumo from './telas/Resumo';
import Temas from './telas/Cadastros/Temas';
import Perguntas from './telas/Cadastros/Perguntas';

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
  <Stack.Screen name="Cadastros" component={Cadastros} options={{ headerBackVisible: true , animation: 'slide_from_bottom', headerStyle: { paddingTop: 40 } }} />
  <Stack.Screen name="Temas" component={Temas} options={{ headerBackVisible: true , title: 'Cadastros de Temas', animation: 'slide_from_right', headerStyle: { paddingTop: 70 } }} /> 
  <Stack.Screen name="Perguntas" component={Perguntas} options={{ headerBackVisible: true , title: 'Cadastros de Perguntas', animation: 'slide_from_right', headerStyle: { paddingTop: 40 } }} />
        <Stack.Screen name="Resumo" component={Resumo} options={{ headerBackVisible: false, headerBackTitleVisible: false, title: 'Esta é tela 3', animation: 'fade' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


