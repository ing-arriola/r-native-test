import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Keyboard } from 'react-native';

interface Props {
  label: string;
  placeholderText: string;
  onchange: (value: string) => void;
  value: string;
  secure?: boolean;
}

export const InputText = ({ label, placeholderText, onchange, value, secure }: Props) => {
  // Función para validar que solo se ingresen números
  const handleTextChange = (text: string) => {
    // Utiliza una expresión regular para validar números enteros o decimales con 2 lugares decimales
    if (/^\d+(\.\d{0,2})?$/.test(text) || text === '') {
      onchange(text); // Llama a la función onchange solo si es válido
    }
  };

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor='rgba(255,255,255,0.4)'
        underlineColorAndroid='white'
        style={[styles.inputAndroid, Platform.OS === 'ios' && styles.inputIos]}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={handleTextChange} // Usamos la función de validación
        value={value}
        secureTextEntry={secure}
        keyboardType='numeric'
        onBlur={()=>Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputAndroid: {
    color: 'white',
    padding:8
  },
  inputIos: {
    color: 'black',
    borderBottomColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding:8,
    borderRadius:6
  },
});
