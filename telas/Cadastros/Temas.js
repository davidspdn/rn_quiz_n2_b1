import { StatusBar } from 'expo-status-bar';
import React,{use, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity ,TextInput,ScrollView,Alert} from 'react-native';
import {getDbConnection, createTables} from '../../services/dbservice';
import {adicionaTema} from '../../services/temasService';
import styles from './stylesPeguntas';
import { Dropdown } from 'react-native-element-dropdown';


export default function Temas({ navigation }) {
    const [tituloTema, setTituloTema] = useState("");
    const [descricaoTema, setDescricao] = useState("");
   
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
            <Text style={styles.titulo}>Cadastro de Temas</Text>
                <Text></Text><Text></Text>

             <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite o Titulo do Tema"
            value={tituloTema}
            onChangeText={(valor) => setTituloTema(valor)}             
            />
             <Text></Text><Text></Text>
            <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a descrição do Tema"
            value={descricaoTema}
            onChangeText={(valor) => setDescricao(valor)}             
            />
             <Text></Text><Text></Text>
                                  

            <TouchableOpacity style={styles.botao} onPress={adicionaTema(tituloTema)}>
                <Text style={styles.texto}>Cadastrar</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
