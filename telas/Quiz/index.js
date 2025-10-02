import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import styles from './stylesQuiz';
import { Dropdown } from 'react-native-element-dropdown';

export default function Quiz({ route, navigation }) {
    const [temaTitulo, setTemaTitulo] = '';
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

  const [qtdPerguntas, setQtdPerguntas] = useState("");

    useEffect(() => {
        console.log('exibindo a tela QUIZ');

        return () => {
            console.log('saindo da tela');
        }
    }, [])


    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>QUIZ!</Text>

            <Dropdown
                style={[styles.campoEdicao, styles.sombra]}
                data={dataExTemas}
                labelField="label"
                valueField="value"
                placeholder="Selecione o tema"
                value={temaTitulo}
                onChange={item => {
                    setTema(item.value);
                }}
            />

             <Text></Text><Text></Text>

             <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            placeholder="Digite a Quantidade de Perguntas"
            value={qtdPerguntas}
            onChangeText={(valor) => setQtdPerguntas(valor)}             
            />
             <Text></Text><Text></Text>
            
            <Text></Text><Text></Text>
           
            <Text></Text><Text></Text>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Jogo')}>
                <Text style={styles.texto}>Jogar</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}
