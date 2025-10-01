import { StatusBar } from 'expo-status-bar';
import React,{use, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity ,TextInput,ScrollView} from 'react-native';
import {getDbConnection, createTables} from '../../services/dbservice';


export default function Perguntas({ navigation }) {
    const [tema, setTema] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [resposta1, setResposta1] = useState("");
    const [resposta2, setResposta2] = useState("");
    const [resposta3, setResposta3] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Cadastros de Perguntas !</Text>


            <Text></Text><Text></Text>
            <Text style={styles.texto}>Observe que no topo desta tela tem uma seta para voltar para a tela anterior!</Text>

            <TextInput
            style={styles.campoEdicao}
            placeholder="Digite o tema da pergunta"
            value={tema}
            onChangeText={(valor) => setTema(valor)}             
            />
            <TextInput
            style={styles.campoEdicao}
            placeholder="Digite a pergunta"
            value={tema}
            onChangeText={(valor) => setTema(valor)}             
            />

             <TextInput
            style={styles.campoEdicao}
            placeholder="Digite a Resposta 1"
            value={tema}
            onChangeText={(valor) => setResposta1(valor)}             
            />
            <TextInput
            style={styles.campoEdicao}
            placeholder="Digite a Resposta 2"
            value={tema}
            onChangeText={(valor) => setResposta2(valor)}             
            />

            <TextInput
            style={styles.campoEdicao}
            placeholder="Digite a Resposta 3"
            value={tema}
            onChangeText={(valor) => setResposta3(valor)}             
            />

            <TextInput
            style={styles.campoEdicao}
            placeholder="Digite a Resposta Correta"
            value={tema}
            onChangeText={(valor) => setRespostaCorreta(valor)}             
            />



            
           



            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros')}>
                <Text style={styles.texto}>Voltar para a tela Cadastros</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
        textAlign: 'center'
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    }
});
