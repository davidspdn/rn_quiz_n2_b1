import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, BackHandler, Alert, FlatList, ScrollView } from 'react-native';
import stylesResumo from './stylesResumo';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { obtemAlternativasPorIds } from '../../services/alternativasService';

export default function Resumo({ navigation, route }) {
    const [perguntasDetalhadas, setPerguntasDetalhadas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Receber dados do jogo via route.params
    const { resultados } = route.params || {};
    
    if (!resultados) {
        // Se não há resultados, redirecionar para home
        useEffect(() => {
            Alert.alert('Erro', 'Nenhum resultado encontrado');
            navigation.navigate('Home');
        }, []);
        return null;
    }

    const { temaNome, totalPerguntas, acertos, pontuacaoFinal, respostas } = resultados;

    useEffect(() => {
        carregarDetalhesRespostas();
    }, []);

    const carregarDetalhesRespostas = async () => {
        try {
            setLoading(true);
            const perguntasComDetalhes = [];
            
            for (const resposta of respostas) {
                // Buscar textos das alternativas
                const alternativasIds = [resposta.alternativaSelecionada, resposta.alternativaCorreta];
                const alternativasTexto = await obtemAlternativasPorIds(alternativasIds);
                
                const alternativaSelecionadaTexto = alternativasTexto.find(alt => alt.id === resposta.alternativaSelecionada)?.descricao || 'N/A';
                const alternativaCorretaTexto = alternativasTexto.find(alt => alt.id === resposta.alternativaCorreta)?.descricao || 'N/A';
                
                perguntasComDetalhes.push({
                    pergunta: resposta.perguntaTexto,
                    respostaCorreta: alternativaCorretaTexto,
                    respostaUsuario: alternativaSelecionadaTexto,
                    acertou: resposta.estaCorreto
                });
            }
            
            setPerguntasDetalhadas(perguntasComDetalhes);
        } catch (error) {
            console.error('Erro ao carregar detalhes das respostas:', error);
            Alert.alert('Erro', 'Erro ao carregar detalhes das respostas');
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <View style={stylesResumo.containerLoading}>
                <Text style={stylesResumo.texto}>Calculando resultados...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={stylesResumo.container} contentContainerStyle={stylesResumo.scrollContent}>
            
            {/* Header de resultados */}
            <View style={stylesResumo.headerResultados}>
                <Text style={stylesResumo.titulo}>🏆 Resultados do Quiz</Text>
                <Text style={stylesResumo.subtitulo}>Tema: {temaNome}</Text>
            </View>

            {/* Estatísticas principais */}
            <View style={stylesResumo.estatisticasContainer}>
                <View style={stylesResumo.estatisticaBox}>
                    <Text style={stylesResumo.estatisticaValor}>{pontuacaoFinal}%</Text>
                    <Text style={stylesResumo.estatisticaLabel}>Aproveitamento</Text>
                </View>
                <View style={stylesResumo.estatisticaBox}>
                    <Text style={stylesResumo.estatisticaValor}>{acertos}/{totalPerguntas}</Text>
                    <Text style={stylesResumo.estatisticaLabel}>Acertos</Text>
                </View>
            </View>

            {/* Status do desempenho */}
            <View style={stylesResumo.desempenhoContainer}>
                <Text style={[
                    stylesResumo.desempenhoTexto,
                    pontuacaoFinal >= 70 ? stylesResumo.desempenhoBom : 
                    pontuacaoFinal >= 50 ? stylesResumo.desempenhoMedio : 
                    stylesResumo.desempenhoRuim
                ]}>
                    {pontuacaoFinal >= 70 ? 'Parabéns! Excelente desempenho!' :
                     pontuacaoFinal >= 50 ? 'Bom trabalho! Continue praticando!' :
                     'Continue estudando, você vai melhorar!'}
                </Text>
            </View>

            {/* Detalhes pergunta por pergunta */}
            <Text style={stylesResumo.tituloDetalhes}>📝 Revisão das Perguntas:</Text>
            
            {perguntasDetalhadas.map((item, index) => (
                <View key={index} style={[
                    stylesResumo.perguntaBox,
                    item.acertou ? stylesResumo.perguntaBoxAcerto : stylesResumo.perguntaBoxErro
                ]}>
                    <View style={stylesResumo.perguntaHeader}>
                        <Text style={stylesResumo.perguntaNumero}>#{index + 1}</Text>
                        <Text style={[
                            stylesResumo.perguntaStatus,
                            item.acertou ? stylesResumo.statusAcerto : stylesResumo.statusErro
                        ]}>
                            {item.acertou ? '✅ ACERTOU' : '❌ ERROU'}
                        </Text>
                    </View>
                    
                    <Text style={stylesResumo.perguntaTitulo}>{item.pergunta}</Text>
                    
                    <View style={stylesResumo.respostasContainer}>
                        <Text style={stylesResumo.respostaCorreta}>
                            ✓ Resposta correta: {item.respostaCorreta}
                        </Text>
                        <Text style={[
                            stylesResumo.respostaUsuario,
                            item.acertou ? stylesResumo.respostaUsuarioAcerto : stylesResumo.respostaUsuarioErro
                        ]}>
                            {item.acertou ? '✓' : '✗'} Sua resposta: {item.respostaUsuario}
                        </Text>
                    </View>
                </View>
            ))}

            {/* Botões de ação */}
            <View style={stylesResumo.botoesContainer}>
                <TouchableOpacity 
                    style={stylesResumo.botaoSecundario}
                    onPress={() => navigation.navigate('Quiz')}
                >
                    <Text style={stylesResumo.textoBotaoSecundario}>🎯 Novo Quiz</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={stylesResumo.botao}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={stylesResumo.textoBotao}>🏠 Voltar ao Início</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}

