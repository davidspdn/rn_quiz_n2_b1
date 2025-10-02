import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 1,
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



   
});



export default styles;