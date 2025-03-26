import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [numLados, setNumLados] = useState(null);
  const [numDados, setNumDados] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [messageDados, setMessageDados] = useState("Coloque o número de dados");

  function sortearDados() {
    Keyboard.dismiss();
    if (numLados != null && numDados != null) {
      let resultadosArray = [];

      for (let i = 0; i < numDados; i++) {
        let sorteio = Math.floor(Math.random() * numLados) + 1;
        resultadosArray.push(sorteio);
      }

      setResultados(resultadosArray);
      setMessageDados("Sorteio realizado!");
    } else {
      setResultados([]);
      setMessageDados("Por favor, preencha o número de dados e lados");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlecontainer}>
       <Text style={styles.title}>Sorteador de Dados</Text>
      </View>
      <View style={styles.content}>
       <Text style={styles.subtitle}>Role seus dados</Text>

        <View>
          <Text style={styles.label}>Número de Dados</Text>
          <TextInput
            style={styles.input}
            value={numDados ?? ''}
            onChangeText={(text) => setNumDados(Number(text))}
            placeholder='Ex. 2'
            keyboardType='numeric'
          ></TextInput>
        </View>

        <View style={{ marginTop: 25 }}>
          <Text style={styles.label}>Número de Lados</Text>
          <TextInput
            style={styles.input}
            value={numLados ?? ''}
            onChangeText={(text) => setNumLados(Number(text))}
            placeholder='Ex. 20'
            keyboardType='numeric'
          ></TextInput>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => sortearDados()}
        >
          <Ionicons name="dice" size={24} color="#edf2f4" />
          <Text style={styles.text}>Sortear</Text>-
        </TouchableOpacity>

        <View style={styles.resultadosContainer}>
          <Text style={styles.resultadosText}>{messageDados}</Text>
          {resultados.length > 0 && (
            <View style={styles.resultadosList}>
              {resultados.map((resultado, index) => (
                <Text key={index} style={styles.resultadoItem}>Dado {index + 1}: {resultado}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',

  },
  titlecontainer: {
    alignItems:'center',
    justifyContent: 'flex-end',
    height: 130,
    backgroundColor: '#D90429',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  title:{
    color:'#EDF2F4',
    fontSize: 28,
    fontWeight:'bold',
    marginBottom: 30,
  },
  content:{
    flex: 1,
    padding: 40,
    width:'100%',
    backgroundColor:'EDF2F4'
    
  },
  subtitle:{
    textAlign: 'center',
    fontSize: 24,
    color:'#D90429',
    fontWeight:'bold',
    marginBottom: 40,
  },
  label:{
    color: '#000',
    fontSize: 18,
  },
  input:{
    height: 45,
    width:'100%',
    fontSize: 18,
    borderColor: '#D90429',
    borderBottomWidth: 1,
  },

  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef233c',
    borderRadius: 15,
    marginTop: 40,
    marginbottom: 10,
  },
  text: {
    color: '#edf2f4',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultadosContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resultadosText: {
    fontSize: 18,
    color: '#ef233c',
    fontWeight: 'bold',
  },
  resultadosList: {
    marginTop: 20,
  },
  resultadoItem: {
    fontSize: 18,
    color: '#ef233c',
    fontWeight: 'bold',
    marginVertical: 5,
  },
})