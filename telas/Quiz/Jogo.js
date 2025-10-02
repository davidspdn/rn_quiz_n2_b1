import { StatusBar } from 'expo-status-bar';
import React,{use, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity ,TextInput,ScrollView,Alert} from 'react-native';
import {getDbConnection, createTables} from '../../services/dbservice';
import styles from './stylesQuiz';
import { Dropdown } from 'react-native-element-dropdown';


/* TODO:
Reaproveitar tela para as próximas perguntas do quiz,
basta clicar em próximo e ir atualizando as perguntas e respostas
até o final do quiz, depois direcionar para a tela de resumo */


export default function Jogo({ navigation }) {
    const [tema, setTema] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [resposta1, setResposta1] = useState("");
    const [resposta2, setResposta2] = useState("");
    const [resposta3, setResposta3] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState("");
    const dataExTemas = [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' },
    { label: 'D', value: '4' },    
  ];

    return (
        <View style={styles.container}>           

            
            <Text style={styles.titulo}>PERGUNTA</Text>
            
             <Text style={styles.labelCampo}>Cadastre os temas e as perguntas do jogo, caso a pergunta não tenha um tema já criado, crie primeiramente o tema e depois quando cadastrar a pergunta, selecione o tema</Text>
                

            <View style={styles.alternativaContainer}>
                <Text style={styles.letraAlternativa}>A)</Text>
                <TextInput
                    style={[styles.campoEdicao, styles.sombra, styles.inputAlternativa]}
                    placeholder="Digite a Resposta 1"
                    value={resposta1}
                    onChangeText={(valor) => setResposta1(valor)}
                />
            </View>
            <Text></Text><Text></Text>
            <View style={styles.alternativaContainer}>
                <Text style={styles.letraAlternativa}>B)</Text>
                <TextInput
                    style={[styles.campoEdicao, styles.sombra, styles.inputAlternativa]}
                    placeholder="Digite a Resposta 2"
                    value={resposta2}
                    onChangeText={(valor) => setResposta2(valor)}
                />
            </View>
            <Text></Text><Text></Text>
            <View style={styles.alternativaContainer}>
                <Text style={styles.letraAlternativa}>C)</Text>
                <TextInput
                    style={[styles.campoEdicao, styles.sombra, styles.inputAlternativa]}
                    placeholder="Digite a Resposta 3"
                    value={resposta3}
                    onChangeText={(valor) => setResposta3(valor)}
                />
            </View>
            <Text></Text><Text></Text>
            <View style={styles.alternativaContainer}>
                <Text style={styles.letraAlternativa}>D)</Text>
                <TextInput
                    style={[styles.campoEdicao, styles.sombra, styles.inputAlternativa]}
                    placeholder="Digite a Resposta Correta"
                    value={respostaCorreta}
                    onChangeText={(valor) => setRespostaCorreta(valor)}
                />
            </View>
            <Text></Text><Text></Text>

            <View  style={styles.alternativaContainer}>
             <Dropdown
                style={[styles.campoEdicao, styles.sombra, styles.inputAlternativa]}
                data={dataExTemas}
                labelField="label"
                valueField="value"
                placeholder="Resposta Correta"
                value={tema}
                onChange={item => {
                    setTema(item.value);
                }}
            />
            
            </View>           
            <Text></Text><Text></Text>        
            
            
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastros')}>
                <Text style={styles.texto}>Próximo</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
