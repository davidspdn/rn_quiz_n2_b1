import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './stylesPeguntas';
export default function Cadastros({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastros</Text>

            <Text style={styles.texto}>Cadastre os temas e as perguntas do jogo, caso a pergunta não tenha um tema já criado, crie primeiramente o tema e depois quando cadastrar a pergunta, selecione o tema</Text>
            
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Temas')}>
                <Text style={styles.texto}>Temas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Perguntas')}>
                <Text style={styles.texto}>Perguntas</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
