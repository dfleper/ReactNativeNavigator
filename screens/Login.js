import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ onLogin, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Recuperar los datos de AsyncStorage cuando la pantalla se carga
    const retrieveData = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedUsername && savedPassword) {
          setUsername(savedUsername);
          setPassword(savedPassword);
        }
      } catch (error) {
        console.error("Error al recuperar datos de AsyncStorage:", error);
      }
    };

    retrieveData();
  }, []);

  const handleLogin = async () => {
    // Guardar el nombre de usuario y la contraseña en AsyncStorage
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      if (username === "user" && password === "123") {
        // Las credenciales son correctas, navega a la pantalla AllScreen
        //alert("Credenciales Correctas.");
        onLogin();
      } else {
        // Las credenciales son incorrectas, muestra un mensaje de error
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al guardar datos en AsyncStorage:", error);
    }
  };

  const handleLogout = async () => {
    // Borrar los datos de AsyncStorage y restablecer los campos
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      setUsername("");
      setPassword("");
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Error al eliminar datos de AsyncStorage:", error);
    }
  };

  return (
    <View>
      <Text>Nombre de usuario:</Text>
      <TextInput value={username} onChangeText={(text) => setUsername(text)} />
      <Text>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default LoginScreen;
