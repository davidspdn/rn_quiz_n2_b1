import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler, Alert, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Resumo({ navigation, route }) {
    const [textoResumo, setTextoResumo] = useState('Texto enviado da tela 3!');

    // Exemplo de dados do jogo (substitua por dados reais vindos do jogo)
    const perguntasJogadas = [
        {
            pergunta: 'Qual a capital do Brasil?',
            respostaCorreta: 'Brasília',
            respostaUsuario: 'Brasília',
        },
        {
            pergunta: 'Qual o maior planeta do sistema solar?',
            respostaCorreta: 'Júpiter',
            respostaUsuario: 'Saturno',
        },
        {
            pergunta: 'Quem escreveu Dom Casmurro?',
            respostaCorreta: 'Machado de Assis',
            respostaUsuario: 'Machado de Assis',
        },
    ];

    const total = perguntasJogadas.length;
    const acertos = perguntasJogadas.filter(p => p.respostaUsuario === p.respostaCorreta).length;
    const porcentagem = total > 0 ? Math.round((acertos / total) * 100) : 0;

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert('Não é permitido usar o botão de "VOLTAR" do celular..');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                console.log('saindo da tela 3...');
                subscription.remove();
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Dashboard de Resultados</Text>
            <Text style={styles.textoPequeno}>Porcentagem de acertos: <Text style={{fontWeight:'bold'}}>{porcentagem}%</Text></Text>
            <Text style={styles.textoPequeno}>Total de perguntas: {total}</Text>
            <Text style={styles.textoPequeno}>Total de acertos: {acertos}</Text>

            <Text style={[styles.textoPequeno, {marginTop: 20, fontWeight:'bold'}]}>Perguntas Jogadas:</Text>
            <FlatList
                data={perguntasJogadas}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item, index}) => (
                    <View style={{marginBottom: 16, backgroundColor:'#eef', borderRadius:10, padding:10, width:'90%', alignSelf:'center'}}>
                        <Text style={{fontSize:18}}>{index+1}. {item.pergunta}</Text>
                        <Text style={{fontSize:16}}>Resposta correta: <Text style={{fontWeight:'bold', color:'#1a7'}}>{item.respostaCorreta}</Text></Text>
                        <Text style={{fontSize:16}}>Sua resposta: <Text style={{fontWeight:'bold', color: item.respostaUsuario === item.respostaCorreta ? '#1a7' : '#a11'}}>{item.respostaUsuario}</Text></Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.botao}
                onPress={() => {
                    navigation.navigate({
                        name: 'Home',
                        params: { parametroTextoResumo: textoResumo },
                    });
                }}>
                <Text style={styles.texto}>Jogar Novamente</Text>
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
