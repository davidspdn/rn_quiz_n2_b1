import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Cadastros({ navigation }) {
    return (
        <View style={styles.container}>
                <Text style={styles.texto}>Você está na Cadastros !</Text>

                <Text></Text><Text></Text>
                <Text style={styles.texto}>Observe que no topo desta tela tem uma seta para voltar para a tela anterior!</Text>
                <Text></Text><Text></Text>
                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={[styles.botao, styles.voltarBotao]} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.texto}>Voltar para a Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Perguntas')}>
                        <Text style={styles.texto}>Perguntas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Temas')}>
                        <Text style={styles.texto}>Temas</Text>
                    </TouchableOpacity>
                </View>
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
    botoesContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    voltarBotao: {
        marginTop: 40,
    }
});
