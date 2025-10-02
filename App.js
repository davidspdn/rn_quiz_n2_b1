import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import Quiz from './telas/Quiz';
import Cadastros from './telas/Cadastros';
import Resumo from './telas/Resumo';
import Temas from './telas/Cadastros/Temas';
import Perguntas from './telas/Cadastros/Perguntas';
import Editar from './telas/Cadastros/Editar';
import Jogo from './telas/Quiz/Jogo'; 

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
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: true,title: 'Home',animation: 'slide_from_bottom'  }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ headerBackVisible: true, headerShown: true }} />
        <Stack.Screen name="Cadastros" component={Cadastros} options={{ headerBackVisible: true , animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Temas" component={Temas} options={{ headerBackVisible: true , title: 'Cadastros de Temas', animation: 'slide_from_right',}} /> 
        <Stack.Screen name="Perguntas" component={Perguntas} options={{ headerBackVisible: true , title: 'Cadastros de Perguntas', animation: 'slide_from_right'}} />
        <Stack.Screen name="Resumo" component={Resumo} options={{ headerBackVisible: true, headerBackTitleVisible: true, title: 'Resumo', animation: 'slide_from_right' }} />
        <Stack.Screen name="Jogo" component={Jogo} options={{ headerBackVisible: true, headerBackTitleVisible: true, title: 'Jogo Quiz', animation: 'fade' }} />
        <Stack.Screen name="Editar" component={Editar} options={{ headerBackVisible: true, headerBackTitleVisible: true, title: 'Editar', animation: 'fade' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


