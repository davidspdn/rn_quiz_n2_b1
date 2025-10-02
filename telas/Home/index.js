import { StatusBar } from 'expo-status-bar';
import { use, useEffect, useState } from 'react';
import { getDbConnection, createTables } from '../../services/dbservice';
import styles from './stylesHome';

import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function Home({ navigation, route }) {

    const [texto, setTexto] = useState('texto digitado na home');

    const dbCreate = createTables();
    const dbservice = getDbConnection();

    useEffect(() => {

        dbCreate;
        console.log("tabelas criadas");

        dbservice;
        console.log("Pegando conexão");

    }, []);
    console.log("tabelas criadas");


    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Quiz</Text>
            <Text></Text><Text></Text>
         
          

            


            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros', { parametroTexto: texto })}>
                <Text style={styles.texto}>Cadastros</Text>
            </TouchableOpacity>
            <Text></Text><Text></Text>
            <Text></Text><Text></Text>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.texto}>Quiz</Text>
            </TouchableOpacity>
            <Text></Text><Text></Text>
            <Text></Text><Text></Text>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Resumo')}>
                <Text style={styles.texto}>Resumo</Text>
            </TouchableOpacity>


            
            <StatusBar style="auto" />
        </View>
    );
}
/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
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
        marginBottom: 10,
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

    }
});

*/