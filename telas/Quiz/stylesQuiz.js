import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 1,
    },

    // Container específico para ScrollView
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },

    titulo: {
        fontSize: 30,
        color: '#8a1a1aff',
        fontWeight: 'bold',
    },

    areaTitulo: {
        width: '95%',
        height: 60,
        backgroundColor: '#2e1cd4',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,

    },
    labelCampo: {
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '80%',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },

    sombra: {
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 11,
        },
    },
    campoEdicao: {
        backgroundColor: '#7cd1eb',
        width: '80%',
        height: 40,
        fontSize: 17,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    botao: {
        width: "80%",
        height: 60,
        backgroundColor: '#7cd1eb',
        borderColor: '#000',
        borderWidth: 3,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    texto: {
        fontSize: 30,
        textAlign: 'center'
    },

    alternativaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        width: '95%',
        alignSelf: 'center',
    },
    letraAlternativa: {
        fontWeight: 'bold',
        fontSize: 22,
        marginRight: 12,
        width: 32,
        textAlign: 'center',
    },
    inputAlternativa: {
        flex: 1,
        height: 48,
        fontSize: 18,
        borderRadius: 16,
        paddingHorizontal: 12,
    },

    // Estilos para configuração do Quiz
    infoText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '500',
    },
    resumoContainer: {
        backgroundColor: '#e8f4fd',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        width: '80%',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    resumoText: {
        fontSize: 16,
        color: '#1976D2',
        fontWeight: '600',
        textAlign: 'center',
    },
    botaoDisabled: {
        backgroundColor: '#cccccc',
        borderColor: '#999999',
    },

    // Estilos para o Jogo
    headerQuiz: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        alignSelf: 'stretch', // Garante largura total
    },
    temaText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 5,
    },
    progressoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3,
    },
    pontuacaoText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
    perguntaContainer: {
        backgroundColor: '#fff',
        margin: 15,
        padding: 20,
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        borderRightColor: '#2196F3',
        width: '95%',
        alignSelf: 'stretch',
    },
    perguntaTexto: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        width: '100%',
        lineHeight: 26,
    },
    alternativasContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    botaoAlternativa: {
        backgroundColor: '#f8f9fa',
        borderWidth: 2,
        borderColor: '#dee2e6',
        borderRadius: 12,
        marginVertical: 6,
        padding: 15,
        minHeight: 60,
        width: '100%',
    },
    botaoSelecionado: {
        backgroundColor: '#cce5ff',
        borderColor: '#007bff',
        borderWidth: 3,
    },
    alternativaContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    textoAlternativa: {
        fontSize: 16,
        color: '#495057',
        flex: 1,
        marginLeft: 10,
        lineHeight: 22,
    },
    feedbackContainer: {
        margin: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    feedbackTexto: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    feedbackCorreto: {
        color: '#28a745',
    },
    feedbackIncorreto: {
        color: '#dc3545',
    },
    botaoProximo: {
        backgroundColor: '#007bff',
        margin: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textoProximo: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        justifyContent: 'center',
    },

   
});



export default styles;