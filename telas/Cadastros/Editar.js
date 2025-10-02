import { StatusBar } from 'expo-status-bar';
import React,{use, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, BackHandler, Alert, FlatList, Dimensions } from 'react-native';
import {getDbConnection, createTables} from '../../services/dbservice';
import styles from './stylesPeguntas';
import { Dropdown } from 'react-native-element-dropdown';

/* TODO:
Reaproveitar tela para Editar perguntas do quiz,
basta selecionar o Temas e ir atualizando as perguntas e respostas
, depois direcionar para a tela de cadastr0 */

export default function Editar({ navigation }) {
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

  const perguntasCadastradas = [
        {
            pergunta: 'Qual a capital do Brasil?',
            respostaCorreta: 'Brasília',
            respostaUsuario: 'Brasília',
        },
        {
            pergunta: 'Qual o maior planeta do sistema solar?',
            respostaCorreta: 'Júpiter',
            respostaUsuario: 'Saturno',
        },
        {
            pergunta: 'Quem escreveu Dom Casmurro?',
            respostaCorreta: 'Machado de Assis',
            respostaUsuario: 'Machado de Assis',
        },
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


             <FlatList
                data={perguntasCadastradas}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item, index}) => (
                    <View style={styles.perguntaBox}>
                        <Text style={styles.perguntaTitulo}>{index+1}. {item.pergunta}</Text>
                        <Text style={styles.respostaCorreta}>Resposta correta: {item.respostaCorreta}</Text>
                        <Text style={[styles.respostaUsuario, item.respostaUsuario === item.respostaCorreta ? styles.respostaUsuarioAcerto : styles.respostaUsuarioErro]}>Sua resposta: {item.respostaUsuario}</Text>
                    </View>
                )}
            />

                      

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros')}>
                <Text style={styles.texto}>Cadastrar</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
