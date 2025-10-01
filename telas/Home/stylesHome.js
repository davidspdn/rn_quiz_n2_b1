


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
     }

  

});



export default styles;