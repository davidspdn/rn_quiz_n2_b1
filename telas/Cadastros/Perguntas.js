import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, FlatList } from 'react-native';
import { getDbConnection, createTables } from '../../services/dbservice';
import { adicionaPergunta, obtemTodasPerguntas, alteraPergunta, excluiPergunta } from '../../services/perguntasService';
import { obtemTodosTemas } from '../../services/temasService';
import { adicionaAlternativa, obtemTodasAlternativas, obtemAlternativasPorIds } from '../../services/alternativasService';
import styles from './stylesPeguntas';
import { Dropdown } from 'react-native-element-dropdown';


export default function Perguntas({ navigation }) {
    const [temaId, setTemaId] = useState("");
    const [perguntaTexto, setPerguntaTexto] = useState("");
    const [alternativaCorreta, setAlternativaCorreta] = useState("");
    const [alternativa2, setAlternativa2] = useState("");
    const [alternativa3, setAlternativa3] = useState("");
    const [alternativa4, setAlternativa4] = useState("");
    
    const [temas, setTemas] = useState([]);
    const [perguntas, setPerguntas] = useState([]);
    const [todasPerguntas, setTodasPerguntas] = useState([]); // Cache de todas as perguntas
    const [perguntaEditando, setPerguntaEditando] = useState(null);
    const [filtroTema, setFiltroTema] = useState(""); // Filtro por tema

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            await carregarTemas();
            await carregarPerguntas();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            Alert.alert('Erro', 'Erro ao carregar dados: ' + error.message);
        }
    };

    const carregarTemas = async () => {
        try {
            const temasCarregados = await obtemTodosTemas();
            
            // Validar se os temas são válidos
            const temasValidos = temasCarregados.filter(tema => tema && tema.id && tema.titulo);
            
            const temasFormatados = [
                { label: 'Todos os Temas', value: '' }, // Opção para mostrar todos
                ...temasValidos.map(tema => ({
                    label: tema.titulo,
                    value: tema.id.toString()
                }))
            ];
            setTemas(temasFormatados);
        } catch (error) {
            console.error('Erro ao carregar temas:', error);
            Alert.alert('Erro', 'Erro ao carregar temas: ' + error.message);
        }
    };

    const carregarPerguntas = async () => {
        try {
            const perguntasCarregadas = await obtemTodasPerguntas();
            
            // Validar se as perguntas são válidas
            const perguntasValidas = perguntasCarregadas.filter(pergunta => 
                pergunta && 
                pergunta.id && 
                pergunta.descricao && 
                pergunta.tema_id
            );
            
            setTodasPerguntas(perguntasValidas); // Guardar todas as perguntas em cache
            aplicarFiltro(perguntasValidas, filtroTema); // Aplicar filtro atual
        } catch (error) {
            console.error('Erro ao carregar perguntas:', error);
            Alert.alert('Erro', 'Erro ao carregar perguntas: ' + error.message);
        }
    };

    // Função para aplicar filtro sem acessar o banco
    const aplicarFiltro = (perguntasBase = todasPerguntas, temaFiltro = filtroTema) => {
        // Garantir que perguntasBase é um array válido
        const perguntasSeguras = Array.isArray(perguntasBase) ? perguntasBase : [];
        
        if (!temaFiltro || temaFiltro === '') {
            // Mostrar todas as perguntas
            setPerguntas(perguntasSeguras);
        } else {
            // Filtrar por tema específico
            const perguntasFiltradas = perguntasSeguras.filter(
                pergunta => pergunta && pergunta.tema_id && pergunta.tema_id.toString() === temaFiltro
            );
            setPerguntas(perguntasFiltradas);
        }
    };

    // Handler para mudança do filtro
    const handleFiltroChange = (novoFiltro) => {
        setFiltroTema(novoFiltro);
        aplicarFiltro(todasPerguntas, novoFiltro);
    };

    const handleSalvarPergunta = async () => {
        if (!temaId || !perguntaTexto.trim() || !alternativaCorreta.trim() || !alternativa2.trim() || 
            !alternativa3.trim() || !alternativa4.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            // Criar as 4 alternativas (a primeira é a correta)
            const altCorreta = await adicionaAlternativa({ descricao: alternativaCorreta.trim() });
            const alt2 = await adicionaAlternativa({ descricao: alternativa2.trim() });
            const alt3 = await adicionaAlternativa({ descricao: alternativa3.trim() });
            const alt4 = await adicionaAlternativa({ descricao: alternativa4.trim() });

            if (!altCorreta.sucesso || !alt2.sucesso || !alt3.sucesso || !alt4.sucesso) {
                Alert.alert('Erro', 'Erro ao criar alternativas');
                return;
            }

            const novaPergunta = {
                tema_id: parseInt(temaId),
                descricao: perguntaTexto.trim(),
                alternativa1_id: altCorreta.id, // A primeira alternativa é a correta
                alternativa2_id: alt2.id,
                alternativa3_id: alt3.id,
                alternativa4_id: alt4.id,
                alternativa_correta_id: altCorreta.id // Referencia a primeira alternativa
            };

            let sucesso;
            if (perguntaEditando) {
                // Editando pergunta existente
                novaPergunta.id = perguntaEditando.id;
                sucesso = await alteraPergunta(novaPergunta);
                if (sucesso) {
                    Alert.alert('Sucesso', 'Pergunta atualizada com sucesso!');
                } else {
                    Alert.alert('Erro', 'Erro ao atualizar pergunta');
                }
            } else {
                // Cadastrando nova pergunta
                sucesso = await adicionaPergunta(novaPergunta);
                if (sucesso) {
                    Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
                } else {
                    Alert.alert('Erro', 'Erro ao cadastrar pergunta');
                }
            }

            if (sucesso) {
                limparCampos();
                carregarPerguntas();
            }

        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar pergunta: ' + error.message);
        }
    };

    const handleEditarPergunta = async (pergunta) => {
        setPerguntaEditando(pergunta);
        setTemaId(pergunta.tema_id ? pergunta.tema_id.toString() : "");
        setPerguntaTexto(pergunta.descricao || "");
        
        try {
            // Validar se a pergunta tem os IDs necessários
            if (!pergunta.alternativa1_id || !pergunta.alternativa2_id || 
                !pergunta.alternativa3_id || !pergunta.alternativa4_id || 
                !pergunta.alternativa_correta_id) {
                Alert.alert('Aviso', 'Esta pergunta não possui alternativas válidas. Por favor, digite-as novamente.');
                setAlternativaCorreta("");
                setAlternativa2("");
                setAlternativa3("");
                setAlternativa4("");
                return;
            }

            // Carregar as alternativas da pergunta
            const alternativasIds = [
                pergunta.alternativa1_id,
                pergunta.alternativa2_id,
                pergunta.alternativa3_id,
                pergunta.alternativa4_id
            ];
            
            const alternativas = await obtemAlternativasPorIds(alternativasIds);
            
            if (alternativas.length === 4) {
                // Encontrar qual é a alternativa correta
                const alternativaCorretaObj = alternativas.find(alt => alt.id === pergunta.alternativa_correta_id);
                
                // Preencher o campo da alternativa correta
                if (alternativaCorretaObj) {
                    setAlternativaCorreta(alternativaCorretaObj.descricao);
                }
                
                // Preencher as outras alternativas (excluindo a correta)
                const outrasAlternativas = alternativas.filter(alt => alt.id !== pergunta.alternativa_correta_id);
                
                setAlternativa2(outrasAlternativas[0]?.descricao || "");
                setAlternativa3(outrasAlternativas[1]?.descricao || "");
                setAlternativa4(outrasAlternativas[2]?.descricao || "");
                // scroll to top
                
                
            } else {
                // Se não conseguir carregar as alternativas, limpar os campos
                setAlternativaCorreta("");
                setAlternativa2("");
                setAlternativa3("");
                setAlternativa4("");
                Alert.alert('Aviso', 'Não foi possível carregar as alternativas da pergunta. Por favor, digite-as novamente.');
                console.error('Número insuficiente de alternativas carregadas');
            }
        } catch (error) {
            // Em caso de erro, limpar os campos
            setAlternativaCorreta("");
            setAlternativa2("");
            setAlternativa3("");
            setAlternativa4("");
            Alert.alert('Erro', 'Erro ao carregar alternativas: ' + error.message);
            console.error(error);
        }
    };

    const limparCampos = () => {
        setPerguntaEditando(null);
        setTemaId("");
        setPerguntaTexto("");
        setAlternativaCorreta("");
        setAlternativa2("");
        setAlternativa3("");
        setAlternativa4("");
    };

    const handleExcluirPergunta = (pergunta) => {
        Alert.alert(
            'Confirmar exclusão',
            `Deseja realmente excluir a pergunta "${pergunta.descricao}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Excluir', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const sucesso = await excluiPergunta(pergunta.id);
                            if (sucesso) {
                                Alert.alert('Sucesso', 'Pergunta excluída com sucesso!');
                                carregarPerguntas();
                            } else {
                                Alert.alert('Erro', 'Erro ao excluir pergunta');
                            }
                        } catch (error) {
                            Alert.alert('Erro', error.message);
                        }
                    }
                }
            ]
        );
    };

    const renderPergunta = ({ item }) => (
        <View style={[styles.perguntaBox, styles.perguntaBoxComMargem]}>
            <Text style={styles.perguntaTitulo}>{item.descricao}</Text>
            <Text style={styles.respostaCorreta}>Tema: {item.tema_titulo}</Text>
            <View style={styles.botoesAcaoContainer}>
                <TouchableOpacity 
                    style={[styles.botao, styles.botaoEditar]} 
                    onPress={() => handleEditarPergunta(item)}
                >
                    <Text style={[styles.texto, styles.textoPequeno]}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.botao, styles.botaoExcluir]} 
                    onPress={() => handleExcluirPergunta(item)}
                >
                    <Text style={[styles.texto, styles.textoPequeno]}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Perguntas</Text>
                
                <Dropdown
                    style={[styles.campoEdicao, styles.sombra]}
                    data={temas}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o tema"
                    value={temaId}
                    onChange={item => {
                        setTemaId(item.value);
                    }}
                />

                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite a Pergunta"
                    value={perguntaTexto}
                    onChangeText={(valor) => setPerguntaTexto(valor)}
                />

                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite a Alternativa CORRETA"
                    value={alternativaCorreta}
                    onChangeText={(valor) => setAlternativaCorreta(valor)}
                />
                
                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite uma Alternativa"
                    value={alternativa2}
                    onChangeText={(valor) => setAlternativa2(valor)}
                />
                
                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite uma Alternativa"
                    value={alternativa3}
                    onChangeText={(valor) => setAlternativa3(valor)}
                />
                
                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite uma Alternativa"
                    value={alternativa4}
                    onChangeText={(valor) => setAlternativa4(valor)}
                />

                <View style={styles.botoesContainer}>
                    <TouchableOpacity 
                        style={[styles.botao, styles.botaoMetade, styles.botaoLimpar]} 
                        onPress={limparCampos}
                    >
                        <Text style={styles.texto}>Limpar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.botao, styles.botaoMetade]} 
                        onPress={handleSalvarPergunta}
                    >
                        <Text style={styles.texto}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.tituloSecundario}>
                    Perguntas Cadastradas
                </Text>

                {/* Filtro por tema */}
                <View style={styles.filtroContainer}>
                    <Text style={styles.filtroLabel}>
                        🔍 Filtrar por Tema:
                    </Text>
                    <Dropdown
                        style={[styles.campoFiltroTemas, styles.sombra]}
                        data={temas}
                        labelField="label"
                        valueField="value"
                        placeholder="Filtrar por tema"
                        value={filtroTema}
                        onChange={item => handleFiltroChange(item.value)}
                    />
                </View>

                {/* Contador de perguntas */}
                <View style={styles.contadorContainer}>
                    <Text style={styles.contadorTexto}>
                        📊 Mostrando: {perguntas.length} de {todasPerguntas.length} perguntas
                        {filtroTema && (
                            <Text style={styles.contadorFiltro}>
                                {' • Filtrado por: ' + temas.find(t => t.value === filtroTema)?.label}
                            </Text>
                        )}
                    </Text>
                </View>

                {perguntas.length > 0 ? (
                    <FlatList
                        data={perguntas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderPergunta}
                        style={{ width: '100%' }}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={styles.mensagemVazia}>
                        Nenhuma pergunta cadastrada ainda
                    </Text>
                )}

                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}