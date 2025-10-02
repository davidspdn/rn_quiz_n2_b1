import { StatusBar } from 'expo-status-bar';
import { use, useEffect, useState } from 'react';
import { getDbConnection, createTables } from '../../services/dbservice';
import { inserirDadosMockados, verificarDados } from '../../services/mockDataService';
import styles from './stylesHome';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';


export default function Home({ navigation, route }) {

    const [texto, setTexto] = useState('texto digitado na home');
    const [loading, setLoading] = useState(false);
    const [dadosCount, setDadosCount] = useState(null);

    useEffect(() => {
        inicializarBancoDeDados();
    }, []);

    const inicializarBancoDeDados = async () => {
        try {

            await createTables();

            await verificarDadosExistentes();
            
        } catch (error) {
            console.error("Erro ao inicializar banco de dados:", error);
            Alert.alert('Erro', 'Erro ao inicializar sistema: ' + error.message);
        }
    };

    const verificarDadosExistentes = async () => {
        try {
            const dados = await verificarDados();
            setDadosCount(dados);
        } catch (error) {
            console.log('Erro ao verificar dados:', error);
        }
    };

    const handleInserirDadosMockados = async () => {
        Alert.alert(
            'Inserir Dados Mockados',
            'Isso irá LIMPAR todos os dados existentes e inserir dados de exemplo. Continuar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Inserir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const resultado = await inserirDadosMockados();
                            if (resultado.sucesso) {
                                Alert.alert('Sucesso!', `${resultado.message}\n\n📚 8 Temas\n🔤 120+ Alternativas\n❓ 64 Perguntas (8 por tema)`);
                                verificarDadosExistentes();
                            } else {
                                Alert.alert('Erro', resultado.message);
                            }
                        } catch (error) {
                            Alert.alert('Erro', 'Erro inesperado: ' + error.message);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Quiz</Text>

            {dadosCount && (
                <View style={styles.dadosInfo}>
                    <Text style={styles.dadosTexto}>
                        📊 Dados no Banco: {dadosCount.temas} temas • {dadosCount.perguntas} perguntas
                    </Text>
                </View>
            )}

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros', { parametroTexto: texto })}>
                <Text style={styles.texto}>Cadastros</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.texto}>Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.botao, styles.botaoMockado, loading && styles.botaoDisabled]} 
                onPress={handleInserirDadosMockados}
                disabled={loading}
            >
                <Text style={[styles.texto, styles.textoMockado]}>
                    {loading ? '⏳ Inserindo...' : '🎲 Inserir Dados de Exemplo'}
                </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}