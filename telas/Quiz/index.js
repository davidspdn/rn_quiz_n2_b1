import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './stylesQuiz';
import { Dropdown } from 'react-native-element-dropdown';
import { obtemTodosTemas } from '../../services/temasService';
import { obtemPerguntasPorTema } from '../../services/perguntasService';

export default function Quiz({ route, navigation }) {
    const [temaId, setTemaId] = useState(null);
    const [qtdPerguntas, setQtdPerguntas] = useState('');
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0);

    useEffect(() => {
        console.log('Exibindo tela de configuração do Quiz');
        carregarTemas();

        return () => {
            console.log('Saindo da tela de configuração');
        }
    }, []);

    const carregarTemas = async () => {
        try {
            setLoading(true);
            const temasCarregados = await obtemTodosTemas();
            
            // Converter para formato do dropdown
            const temasFormatados = temasCarregados.map(tema => ({
                label: tema.titulo,
                value: tema.id.toString()
            }));
            
            setTemas(temasFormatados);
            console.log('Temas carregados:', temasFormatados.length);
        } catch (error) {
            console.error('Erro ao carregar temas:', error);
            Alert.alert('Erro', 'Não foi possível carregar os temas');
        } finally {
            setLoading(false);
        }
    };

    const verificarPerguntasDisponiveis = async (temaIdSelecionado) => {
        try {
            const perguntasDoTema = await obtemPerguntasPorTema(parseInt(temaIdSelecionado));
            setPerguntasDisponiveis(perguntasDoTema.length);
            return perguntasDoTema.length;
        } catch (error) {
            console.error('Erro ao verificar perguntas:', error);
            return 0;
        }
    };

    const handleTemaChange = async (item) => {
        setTemaId(item.value);
        setQtdPerguntas(''); // Limpar quantidade quando mudar tema
        
        // Verificar quantas perguntas estão disponíveis para o tema
        await verificarPerguntasDisponiveis(item.value);
    };

    const validarEIniciarJogo = async () => {
        // Validações
        if (!temaId) {
            Alert.alert('Atenção', 'Por favor, selecione um tema');
            return;
        }

        if (!qtdPerguntas || isNaN(qtdPerguntas) || parseInt(qtdPerguntas) <= 0) {
            Alert.alert('Atenção', 'Por favor, digite uma quantidade válida de perguntas');
            return;
        }

        const qtdSolicitada = parseInt(qtdPerguntas);
        
        if (qtdSolicitada > perguntasDisponiveis) {
            Alert.alert(
                'Perguntas insuficientes', 
                `Este tema possui apenas ${perguntasDisponiveis} pergunta(s). Por favor, escolha um número menor ou igual a ${perguntasDisponiveis}.`
            );
            return;
        }

        // Navegar para o jogo com os parâmetros
        const temaInfo = temas.find(t => t.value === temaId);
        
        navigation.navigate('Jogo', {
            temaId: parseInt(temaId),
            temaNome: temaInfo.label,
            qtdPerguntas: qtdSolicitada,
            perguntasDisponiveis: perguntasDisponiveis
        });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Configurar Quiz</Text>

            <Text style={styles.labelCampo}>Escolha o tema para o quiz:</Text>
            <Dropdown
                style={[styles.campoEdicao, styles.sombra]}
                data={temas}
                labelField="label"
                valueField="value"
                placeholder={loading ? "Carregando temas..." : "Selecione o tema"}
                value={temaId}
                onChange={handleTemaChange}
                disable={loading}
            />

            {temaId && (
                <Text style={styles.infoText}>
                    📊 Perguntas disponíveis neste tema: {perguntasDisponiveis}
                </Text>
            )}

            <Text style={styles.labelCampo}>Quantas perguntas você quer responder?</Text>
            <TextInput
                style={[styles.campoEdicao, styles.sombra]}
                placeholder={temaId ? `Digite de 1 a ${perguntasDisponiveis}` : "Selecione um tema primeiro"}
                value={qtdPerguntas}
                onChangeText={(valor) => setQtdPerguntas(valor)}
                keyboardType="numeric"
                editable={!!temaId}
            />

            <TouchableOpacity 
                style={[styles.botao, (!temaId || !qtdPerguntas || loading) && styles.botaoDisabled]} 
                onPress={validarEIniciarJogo}
                disabled={!temaId || !qtdPerguntas || loading}
            >
                <Text style={styles.texto}>
                    {loading ? 'Carregando...' : 'Começar Quiz!'}
                </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
