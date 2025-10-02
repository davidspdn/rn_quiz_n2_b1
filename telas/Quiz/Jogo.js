import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './stylesQuiz';
import { obtemPerguntasPorTema, obtemPerguntaCompleta } from '../../services/perguntasService';
import { obtemAlternativasPorIds } from '../../services/alternativasService';

export default function Jogo({ route, navigation }) {
    const { temaId, temaNome, qtdPerguntas, perguntasDisponiveis } = route.params;
    
    const [perguntas, setPerguntas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [perguntaData, setPerguntaData] = useState(null);
    const [alternativas, setAlternativas] = useState([]);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [loading, setLoading] = useState(true);
    const [jogoFinalizado, setJogoFinalizado] = useState(false);

    useEffect(() => {
        console.log('Iniciando jogo:', { temaId, temaNome, qtdPerguntas });
        inicializarJogo();
        
        return () => {
            console.log('Finalizando jogo');
        };
    }, []);

    const inicializarJogo = async () => {
        try {
            setLoading(true);
            
            // Carregar todas as perguntas do tema
            const perguntasDoTema = await obtemPerguntasPorTema(temaId);
            
            if (perguntasDoTema.length === 0) {
                Alert.alert('Erro', 'Nenhuma pergunta encontrada para este tema');
                navigation.goBack();
                return;
            }

            // Embaralhar e pegar apenas a quantidade solicitada
            const perguntasEmbaralhadas = perguntasDoTema.sort(() => 0.5 - Math.random());
            const perguntasSelecionadas = perguntasEmbaralhadas.slice(0, qtdPerguntas);
            
            setPerguntas(perguntasSelecionadas);
            console.log('Perguntas selecionadas:', perguntasSelecionadas.length);
            
            // Carregar primeira pergunta
            await carregarPergunta(0, perguntasSelecionadas);
            
        } catch (error) {
            console.error('Erro ao inicializar jogo:', error);
            Alert.alert('Erro', 'Erro ao carregar perguntas: ' + error.message);
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const carregarPergunta = async (indice, perguntasArray = perguntas) => {
        try {
            const pergunta = perguntasArray[indice];
            setPerguntaData(pergunta);
            
            // Carregar alternativas
            const alternativasIds = [
                pergunta.alternativa1_id,
                pergunta.alternativa2_id,
                pergunta.alternativa3_id,
                pergunta.alternativa4_id
            ];
            
            const alternativasCarregadas = await obtemAlternativasPorIds(alternativasIds);
            
            // Embaralhar alternativas
            const alternativasEmbaralhadas = alternativasCarregadas.sort(() => 0.5 - Math.random());
            setAlternativas(alternativasEmbaralhadas);
            setRespostaSelecionada(null);
            
        } catch (error) {
            console.error('Erro ao carregar pergunta:', error);
            Alert.alert('Erro', 'Erro ao carregar pergunta');
        }
    };

    const selecionarResposta = (alternativaId) => {
        setRespostaSelecionada(alternativaId);
        
        // Verificar se está correto (mas não mostrar feedback)
        const estaCorreto = alternativaId === perguntaData.alternativa_correta_id;
        
        // Salvar resposta
        const novaResposta = {
            perguntaId: perguntaData.id,
            perguntaTexto: perguntaData.descricao,
            alternativaSelecionada: alternativaId,
            alternativaCorreta: perguntaData.alternativa_correta_id,
            estaCorreto: estaCorreto
        };
        
        // Atualizar estados
        const novasRespostas = [...respostas, novaResposta];
        const novaPontuacao = estaCorreto ? pontuacao + 1 : pontuacao;
        
        setRespostas(novasRespostas);
        setPontuacao(novaPontuacao);
        
        console.log('Resposta salva:', novaResposta);
        console.log('Total de respostas:', novasRespostas.length);
        
        // Automaticamente ir para próxima pergunta após pequeno delay
        setTimeout(() => {
            proximaPerguntaComDados(novasRespostas, novaPontuacao);
        }, 500);
    };

    const proximaPerguntaComDados = (respostasAtualizadas, pontuacaoAtualizada) => {
        if (perguntaAtual + 1 < perguntas.length) {
            const proximoIndice = perguntaAtual + 1;
            setPerguntaAtual(proximoIndice);
            carregarPergunta(proximoIndice);
        } else {
            // Fim do jogo
            finalizarJogoComDados(respostasAtualizadas, pontuacaoAtualizada);
        }
    };

    const finalizarJogoComDados = (respostasFinais, pontuacaoFinal) => {
        setJogoFinalizado(true);
        
        const resultados = {
            temaNome: temaNome,
            totalPerguntas: perguntas.length,
            acertos: pontuacaoFinal,
            pontuacaoFinal: Math.round((pontuacaoFinal / perguntas.length) * 100),
            respostas: respostasFinais
        };
        
        console.log('Finalizando jogo com resultados:', resultados);
        console.log('Total de perguntas:', perguntas.length);
        console.log('Total de respostas:', respostasFinais.length);
        
        // Navegar para o resumo
        navigation.navigate('Resumo', { resultados });
    };

    const obterCorBotao = (alternativaId) => {
        if (respostaSelecionada === alternativaId) {
            return [styles.botaoAlternativa, styles.botaoSelecionado]; // Apenas destaca selecionado
        }
        return styles.botaoAlternativa; // Cor padrão
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Text style={styles.titulo}>Carregando Quiz...</Text>
                <Text style={styles.labelCampo}>Preparando perguntas sobre {temaNome}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
            
            {/* Header com progresso */}
            <View style={styles.headerQuiz}>
                <Text style={styles.temaText}>📚 {temaNome}</Text>
                <Text style={styles.progressoText}>
                    Pergunta {perguntaAtual + 1} de {perguntas.length}
                </Text>
            </View>
            
            {/* Pergunta */}
            {perguntaData && (
                <View>
                    <View style={styles.perguntaContainer}>
                        <Text style={styles.perguntaTexto}>{perguntaData.descricao}</Text>
                    </View>
                    
                    {/* Alternativas */}
                    <View style={styles.alternativasContainer}>
                        {alternativas.map((alternativa, index) => (
                            <TouchableOpacity
                                key={alternativa.id}
                                style={obterCorBotao(alternativa.id)}
                                onPress={() => selecionarResposta(alternativa.id)}
                            >
                                <View style={styles.alternativaContent}>
                                    <Text style={styles.letraAlternativa}>
                                        {String.fromCharCode(65 + index)})
                                    </Text>
                                    <Text style={styles.textoAlternativa}>
                                        {alternativa.descricao}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            <StatusBar style="auto" />
        </ScrollView>
    );
}
