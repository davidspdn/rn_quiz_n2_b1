


    import { StyleSheet, StatusBar } from "react-native";


const stylesResumo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
        textAlign: 'center',
    },
    textoPequeno: {
        fontSize: 24,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7cd1eb',
        marginTop: 10,
    },
    caixaTexto: {
        width: "80%",
        height: 50,
        borderColor: '#0AF',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        fontSize: 24,
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
});

export default stylesResumo;


