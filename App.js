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

  function removerDado(index) {
    const novaLista = resultados.filter((_, i) => i !== index);
    setResultados(novaLista);
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
          <Ionicons name="dice" size={24} color="#212121" />
          <Text style={styles.text}>Sortear</Text>
        </TouchableOpacity>

        <View style={styles.resultadosContainer}>
          <Text style={styles.resultadosText}>{messageDados}</Text>
          {resultados.length > 0 && (
            <View style={styles.resultadosList}>
              {resultados.map((resultado, index) => (
                <View key={index} style={styles.resultadoItemContainer}>
                  <Text style={styles.resultadoItem}>Dado {index + 1}: {resultado}</Text>
                  <TouchableOpacity 
                    style={styles.removerButton} 
                    onPress={() => removerDado(index)}
                  >
                    <Ionicons name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
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
    backgroundColor: '#212121',

  },
  titlecontainer: {
    alignItems:'center',
    justifyContent: 'flex-end',
    height: 130,
    backgroundColor: '#FFFFFF',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  title:{
    color:'#212121',
    fontSize: 28,
    fontWeight:'bold',
    marginBottom: 30,
  },
  content:{
    flex: 1,
    padding: 40,
    width:'100%',
    backgroundColor:'FFEB3B'
    
  },
  subtitle:{
    textAlign: 'center',
    fontSize: 24,
    color:'#FFFFFF',
    fontWeight:'bold',
    marginBottom: 40,
  },
  label:{
    color: '#FFFFFF',
    fontSize: 18,
  },
  input:{
    height: 45,
    width:'100%',
    fontSize: 18,
    borderColor: '#FFEB3B',
    borderBottomWidth: 1,
    color: '#FFFFFF',
  },

  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 40,
    marginbottom: 10,
  },
  text: {
    color: '#212121',
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
    color: '#FFEB3B',
    fontWeight: 'bold',
  },
  resultadosList: {
    marginTop: 20,
  },
  resultadoItem: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 5,
  },

  resultadoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  
  removerButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  
})