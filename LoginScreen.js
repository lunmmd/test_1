import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://your-server-ip:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.navigate('Profile');
      } else {
        Alert.alert('Ошибка', data.message);
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось подключиться к серверу');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход в систему</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Войти" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}>
        Нет аккаунта? Зарегистрироваться
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;