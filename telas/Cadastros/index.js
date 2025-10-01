import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './stylesPeguntas';
export default function Cadastros({ navigation }) {
    return (
        <View style={styles.container}>
                <Text style={styles.titulo}>Cadastros</Text>

                <Text></Text><Text></Text>
                <Text style={styles.texto}>Cadastre os temas e as perguntas do jogo, caso a pergunta não tenha um tema já criado, crie primeiramente o tema e depois quando cadastrar a pergunta, selecione o tema</Text>
                <Text></Text><Text></Text>


                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Temas')}>
                        <Text style={styles.texto}>Temas</Text>
                    </TouchableOpacity>
                    <Text></Text><Text></Text>
                    <Text></Text><Text></Text>



                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Perguntas')}>
                        <Text style={styles.texto}>Perguntas</Text>
                    </TouchableOpacity>
                    <Text></Text><Text></Text>
                    <Text></Text><Text></Text>


                    
                <StatusBar style="auto" />
        </View>
    );
}
/*
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
*/