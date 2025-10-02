


    import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 0,
    },

    titulo: {
        fontSize: 30,
        color: '#8a1a1aff',
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 50,
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
        }
    },
    campoEdicao: {
        backgroundColor: '#7cd1eb',
        width: '80%',
        height: 40,
        fontSize: 17,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 40,
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
        marginBottom: 20,

    },
     texto: {
        fontSize: 30,
        textAlign: 'center'
     },

     perguntaBox: {
        marginBottom: 16,
        backgroundColor:'#eef',
        borderRadius:10,
        padding:10,
        width:'90%',
        alignSelf:'center',
    },
    perguntaTitulo: {
        fontSize:18,
    },
    respostaCorreta: {
        fontSize:16,
        fontWeight:'bold',
        color:'#1a7',
    },
    respostaUsuario: {
        fontSize:16,
        fontWeight:'bold',
    },
    respostaUsuarioAcerto: {
        color:'#1a7',
    },
    respostaUsuarioErro: {
        color:'#a11',
    },

    // Novos estilos para o sistema de filtro e layout
    scrollContainer: {
        flex: 1,
    },
    
    scrollContentContainer: {
        flexGrow: 1,
    },

    filtroContainer: {
        width: '80%',
        marginBottom: 10,
    },

    filtroLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },

    contadorContainer: {
        backgroundColor: '#e3f2fd',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },

    contadorTexto: {
        fontSize: 14,
        color: '#1976d2',
        fontWeight: 'bold',
    },

    contadorFiltro: {
        color: '#ff9800',
    },

    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },

    botaoMetade: {
        width: '45%',
    },

    botaoLimpar: {
        backgroundColor: '#ff6b6b',
    },

    botaoEditarExcluir: {
        height: 40,
    },

    textoPequeno: {
        fontSize: 16,
    },

    perguntaBoxComMargem: {
        marginTop: 10,
    },

    botoesAcaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    botaoEditar: {
        width: '45%',
        height: 40,
    },

    botaoExcluir: {
        width: '45%',
        height: 40,
        backgroundColor: '#ff6b6b',
    },

    campoEdicaoSemMargem: {
        backgroundColor: '#7cd1eb',
        width: '80%',
        height: 40,
        fontSize: 17,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 0,
    },

    campoFiltroTemas: {
        backgroundColor: '#7cd1eb',
        width: '100%',
        height: 40,
        fontSize: 17,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 0,
    },

    tituloSecundario: {
        fontSize: 24,
        color: '#8a1a1aff',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },

    mensagemVazia: {
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },

});



export default styles;