import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function Home({ navigation, route }) {

    const [texto, setTexto] = useState('texto digitado na home');

    return (

        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Home</Text>
            <Text></Text><Text></Text>

            <Text style={styles.textoPequeno}>Digite algo para enviar para a Tela 1</Text>
            <TextInput
                onChangeText={(valor) => setTexto(valor)}
                style={styles.caixaTexto}
                value={texto}
            />

            <Text> {texto}</Text>


            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros', { parametroTexto: texto })}>
                <Text style={styles.texto}>Cadastros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.texto}>Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Resumo')}>
                <Text style={styles.texto}>Resumo</Text>
            </TouchableOpacity>


            <Text style={styles.texto}>
                Este texto veio da tela Resumo:
                {route.params?.parametroTextoTela3}
            </Text>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
    },
    textoPequeno: {
        fontSize: 24,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    caixaTexto: {
        width: "80%",
        height: 50,
        borderColor: '#0AF',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        fontSize: 24,

    }
});