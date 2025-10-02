import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, BackHandler, Alert, FlatList, Dimensions } from 'react-native';
import stylesResumo from './stylesResumo';
import { BarChart } from 'react-native-chart-kit';
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
                console.log('saindo da tela Resumo...');
                subscription.remove();
            };
        }, [])
    );

    return (
        <View style={stylesResumo.container}>
            <Text style={stylesResumo.texto}>Resultados</Text>
            <Text style={stylesResumo.textoPequeno}>Porcentagem de acertos: <Text style={{fontWeight:'bold'}}>{porcentagem}%</Text></Text>
            <Text style={stylesResumo.textoPequeno}>Total de perguntas: {total}</Text>
            <Text style={stylesResumo.textoPequeno}>Total de acertos: {acertos}</Text>

            {/* Gráfico de barras de acertos/erros */}
            <BarChart
                data={{
                    labels: ['Acertos', 'Erros'],
                    datasets: [
                        {
                            data: [acertos, total - acertos],
                        },
                    ],
                }}
                width={Dimensions.get('window').width * 0.85}
                height={220}
                yAxisLabel={''}
                fromZero={true}
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#e0f7fa',
                    backgroundGradientTo: '#e0f7fa',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(26, 122, 41, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                        stroke: '#ccc',
                    },
                }}
                style={{marginVertical: 16, borderRadius: 16, alignSelf: 'center'}}
            />

            <Text style={[stylesResumo.textoPequeno, {marginTop: 20, fontWeight:'bold'}]}>Perguntas Jogadas:</Text>
            <FlatList
                data={perguntasJogadas}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item, index}) => (
                    <View style={stylesResumo.perguntaBox}>
                        <Text style={stylesResumo.perguntaTitulo}>{index+1}. {item.pergunta}</Text>
                        <Text style={stylesResumo.respostaCorreta}>Resposta correta: {item.respostaCorreta}</Text>
                        <Text style={[stylesResumo.respostaUsuario, item.respostaUsuario === item.respostaCorreta ? stylesResumo.respostaUsuarioAcerto : stylesResumo.respostaUsuarioErro]}>Sua resposta: {item.respostaUsuario}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={stylesResumo.botao}
                onPress={() => {
                    navigation.navigate({
                        name: 'Home',
                        params: { parametroTextoResumo: textoResumo },
                    });
                }}>
                <Text style={stylesResumo.texto}>Jogar Novamente</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

