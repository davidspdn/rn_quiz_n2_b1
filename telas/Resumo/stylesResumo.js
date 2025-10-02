import { StyleSheet, StatusBar } from "react-native";


const stylesResumo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    containerLoading: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    // Header
    headerResultados: {
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
    },
    
    // Estatísticas
    estatisticasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    estatisticaBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    estatisticaValor: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    estatisticaLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    
    // Desempenho
    desempenhoContainer: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    desempenhoTexto: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    desempenhoBom: {
        color: '#4CAF50',
    },
    desempenhoMedio: {
        color: '#FF9800',
    },
    desempenhoRuim: {
        color: '#F44336',
    },
    
    // Detalhes das perguntas
    tituloDetalhes: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        marginBottom: 15,
    },
    perguntaBox: {
        marginHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    perguntaBoxAcerto: {
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    perguntaBoxErro: {
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
    },
    perguntaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    perguntaNumero: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    perguntaStatus: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    statusAcerto: {
        color: '#4CAF50',
    },
    statusErro: {
        color: '#F44336',
    },
    perguntaTitulo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 22,
    },
    respostasContainer: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
    },
    respostaCorreta: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
        marginBottom: 5,
    },
    respostaUsuario: {
        fontSize: 14,
        fontWeight: '600',
    },
    respostaUsuarioAcerto: {
        color: '#4CAF50',
    },
    respostaUsuarioErro: {
        color: '#F44336',
    },
    
    // Botões
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    botao: {
        backgroundColor: '#2196F3',
        borderRadius: 15,
        padding: 15,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botaoSecundario: {
        backgroundColor: '#fff',
        borderColor: '#2196F3',
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textoBotaoSecundario: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: '600',
    },
    
    // Compatibilidade
    texto: {
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
    },
});

export default stylesResumo;


