import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Perguntas({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Cadastros de Perguntas !</Text>

            <Text></Text><Text></Text>
            <Text style={styles.texto}>Observe que no topo desta tela tem uma seta para voltar para a tela anterior!</Text>
            <Text></Text><Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros')}>
                <Text style={styles.texto}>Voltar para a tela Cadastros</Text>
            </TouchableOpacity>

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
        textAlign: 'center'
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    }
});
