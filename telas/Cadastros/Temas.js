import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, FlatList } from 'react-native';
import { getDbConnection, createTables } from '../../services/dbservice';
import { adicionaTema, obtemTodosTemas, alteraTema, excluiTema, contarPerguntasDoTema, verificarIntegridadeDB } from '../../services/temasService';
import styles from './stylesPeguntas';


export default function Temas({ navigation }) {
    const [tituloTema, setTituloTema] = useState("");
    const [descricaoTema, setDescricao] = useState("");
    const [temas, setTemas] = useState([]);
    const [temaEditando, setTemaEditando] = useState(null);

    useEffect(() => {
        inicializarDados();
    }, []);

    const inicializarDados = async () => {
        try {                        
            await carregarTemas();
        } catch (error) {
            console.error('Erro ao inicializar dados:', error);
            Alert.alert('Erro', 'Erro ao inicializar sistema: ' + error.message);
            setTemas([]);
        }
    };

    const carregarTemas = async () => {
        try {
            console.log('Iniciando carregamento de temas...');
            
            // Aguardar um pouco para evitar chamadas muito rápidas
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const temasCarregados = await obtemTodosTemas();
            console.log('Temas carregados do banco:', temasCarregados);
            
            // Validar se os dados retornados são válidos
            if (Array.isArray(temasCarregados)) {
                const temasValidos = temasCarregados.filter(tema => 
                    tema && 
                    tema.id && 
                    typeof tema.id === 'number' && 
                    tema.titulo && 
                    typeof tema.titulo === 'string' && 
                    tema.descricao && 
                    typeof tema.descricao === 'string'
                );
                
                console.log('Temas válidos filtrados:', temasValidos.length);
                setTemas(temasValidos);
            } else {
                console.warn('Dados retornados não são um array:', temasCarregados);
                setTemas([]);
            }
        } catch (error) {
            console.error('Erro ao carregar temas:', error);
            // Não mostrar alert a cada erro para evitar spam
            console.log('Definindo array vazio devido ao erro');
            setTemas([]); // Define array vazio em caso de erro
        }
    };

    const handleSalvarTema = async () => {
        if (!tituloTema.trim() || !descricaoTema.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            if (temaEditando) {
                // Editando tema existente
                const temaAtualizado = {
                    id: temaEditando.id,
                    titulo: tituloTema.trim(),
                    descricao: descricaoTema.trim()
                };
                
                const sucesso = await alteraTema(temaAtualizado);
                if (sucesso) {
                    Alert.alert('Sucesso', 'Tema atualizado com sucesso!');
                    limparCampos();
                    carregarTemas();
                } else {
                    Alert.alert('Erro', 'Erro ao atualizar tema');
                }
            } else {
                // Cadastrando novo tema
                const novoTema = {
                    titulo: tituloTema.trim(),
                    descricao: descricaoTema.trim()
                };
                
                const sucesso = await adicionaTema(novoTema);
                if (sucesso) {
                    Alert.alert('Sucesso', 'Tema cadastrado com sucesso!');
                    limparCampos();
                    carregarTemas();
                } else {
                    Alert.alert('Erro', 'Erro ao cadastrar tema');
                }
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar tema: ' + error.message);
        }
    };

    const handleEditarTema = (tema) => {
        setTemaEditando(tema);
        setTituloTema(tema.titulo);
        setDescricao(tema.descricao);
    };

    const limparCampos = () => {
        setTemaEditando(null);
        setTituloTema("");
        setDescricao("");
    };

    const handleExcluirTema = async (tema) => {
        try {
            // Contar quantas perguntas serão excluídas
            const totalPerguntas = await contarPerguntasDoTema(tema.id);
            
            let mensagem = `Deseja realmente excluir o tema "${tema.titulo}"?`;
            
            if (totalPerguntas > 0) {
                mensagem += `\n\n⚠️ ATENÇÃO: Este tema possui ${totalPerguntas} pergunta(s) associada(s). Todas elas serão excluídas junto com o tema!`;
            } else {
                mensagem += `\n\nEste tema não possui perguntas associadas.`;
            }
            
            Alert.alert(
                'Confirmar exclusão',
                mensagem,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { 
                        text: 'Excluir', 
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                const sucesso = await excluiTema(tema.id);
                                if (sucesso) {
                                    const msgSucesso = totalPerguntas > 0 
                                        ? `Tema excluído com sucesso! ${totalPerguntas} pergunta(s) associada(s) também foram excluídas.`
                                        : 'Tema excluído com sucesso!';
                                    Alert.alert('Sucesso', msgSucesso);
                                    carregarTemas();
                                } else {
                                    Alert.alert('Erro', 'Erro ao excluir tema');
                                }
                            } catch (error) {
                                Alert.alert('Erro', error.message);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Erro', 'Erro ao verificar perguntas associadas: ' + error.message);
        }
    };

    const renderTema = ({ item }) => (
        <View style={[styles.perguntaBox, { marginTop: 10 }]}>
            <Text style={styles.perguntaTitulo}>{item.titulo}</Text>
            <Text style={styles.respostaCorreta}>{item.descricao}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity 
                    style={[styles.botao, { width: '45%', height: 40 }]} 
                    onPress={() => handleEditarTema(item)}
                >
                    <Text style={[styles.texto, { fontSize: 16 }]}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.botao, { width: '45%', height: 40, backgroundColor: '#ff6b6b' }]} 
                    onPress={() => handleExcluirTema(item)}
                >
                    <Text style={[styles.texto, { fontSize: 16 }]}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Temas</Text>

                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite o Titulo do Tema"
                    value={tituloTema}
                    onChangeText={(valor) => setTituloTema(valor)}
                />

                <TextInput
                    style={[styles.campoEdicao, styles.sombra]}
                    placeholder="Digite a descrição do Tema"
                    value={descricaoTema}
                    onChangeText={(valor) => setDescricao(valor)}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                    <TouchableOpacity 
                        style={[styles.botao, { width: '45%', backgroundColor: '#ff6b6b' }]} 
                        onPress={limparCampos}
                    >
                        <Text style={styles.texto}>Limpar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.botao, { width: '45%' }]} 
                        onPress={handleSalvarTema}
                    >
                        <Text style={styles.texto}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.titulo, { fontSize: 24, marginTop: 40, marginBottom: 20 }]}>
                    Temas Cadastrados
                </Text>

                {temas.length > 0 ? (
                    <FlatList
                        data={temas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderTema}
                        style={{ width: '100%' }}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={{ fontSize: 16, color: '#666', marginTop: 20 }}>
                        Nenhum tema cadastrado ainda
                    </Text>
                )}

                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}
