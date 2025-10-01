import { StatusBar } from 'expo-status-bar';
import React,{use, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity ,TextInput,ScrollView,Alert} from 'react-native';
import {getDbConnection, createTables} from '../../services/dbservice';
import styles from './stylesPeguntas';
import { Dropdown } from 'react-native-element-dropdown';


export default function Perguntas({ navigation }) {
    const [tema, setTema] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [resposta1, setResposta1] = useState("");
    const [resposta2, setResposta2] = useState("");
    const [resposta3, setResposta3] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState("");
    const dataExTemas = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

    return (
        <View style={styles.container}>           

            <Text></Text><Text></Text>
            <Text style={styles.titulo}>Cadastro de Perguntas</Text>
             <Text></Text><Text></Text>
            <Dropdown
                style={[styles.campoEdicao, styles.sombra]}
                data={dataExTemas}
                labelField="label"
                valueField="value"
                placeholder="Selecione o tema"
                value={tema}
                onChange={item => {
                    setTema(item.value);
                }}
            />
    


             <Text></Text><Text></Text>

             <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a Resposta 1"
            value={resposta1}
            onChangeText={(valor) => setResposta1(valor)}             
            />
             <Text></Text><Text></Text>
            <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a Resposta 2"
            value={resposta2}
            onChangeText={(valor) => setResposta2(valor)}             
            />
             <Text></Text><Text></Text>
            <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a Resposta 3"
            value={resposta3}
            onChangeText={(valor) => setResposta3(valor)}             
            />
             <Text></Text><Text></Text>
            <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a Resposta Correta"
            value={respostaCorreta}
            onChangeText={(valor) => setRespostaCorreta(valor)}             
            /> 
            <Text></Text><Text></Text>
                      

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros')}>
                <Text style={styles.texto}>Cadastrar</Text>
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
*/