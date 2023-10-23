import React, { useState } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

//Importar Login y TV
import Login from "./screens/Login";
import TV from "./screens/TV";

//Importar All, Business, Health, Sports y Tech
import All from "./screens/All";
import Business from "./screens/Business";
import HealthScreen from "./screens/Health";
import SportsScreen from "./screens/Sports";
import TechScreen from "./screens/Tech";

const Tab = createBottomTabNavigator();

const App = () => {
  const [estado, setEstado] = useState(false);

  const handleLogin = () => {
    setEstado(true);
  };

  const handleLogout = () => {
    setEstado(false);
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Login"
              //component={Login}
              options={{
                tabBarIcon: (props) => (
                  <Icon type="feather" name="user" color={props.color} />
                ),
              }}
            >
              {() => <Login onLogin={handleLogin} onLogout={handleLogout} />}
            </Tab.Screen>

            <Tab.Screen
              name="Free TV"
              component={TV}
              options={{
                tabBarIcon: (props) => (
                  <Icon type="feather" name="tv" color={props.color} />
                ),
              }}
            />

            {estado && (
              <Tab.Screen
                name="All"
                component={All}
                options={{
                  tabBarIcon: (props) => (
                    <Icon type="feather" name="home" color={props.color} />
                  ),
                }}
              />
            )}

            {estado && (
              <Tab.Screen
                name="Business"
                component={Business}
                options={{
                  tabBarIcon: (props) => (
                    <Icon
                      type="feather"
                      name="dollar-sign"
                      color={props.color}
                    />
                  ),
                }}
              />
            )}

            {estado && (
              <Tab.Screen
                name="Health"
                component={HealthScreen}
                options={{
                  tabBarIcon: (props) => (
                    <Icon type="feather" name="heart" color={props.color} />
                  ),
                }}
              />
            )}

            {estado && (
              <Tab.Screen
                name="Sports"
                component={SportsScreen}
                options={{
                  tabBarIcon: (props) => (
                    <Icon
                      type="ionicon"
                      name="tennisball-outline"
                      color={props.color}
                    />
                  ),
                }}
              />
            )}

            {estado && (
              <Tab.Screen
                name="Tech"
                component={TechScreen}
                options={{
                  tabBarIcon: (props) => (
                    <Icon
                      type="ionicon"
                      name="hardware-chip-outline"
                      color={props.color}
                    />
                  ),
                }}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </ImageBackground>
  );
};

//Estilos
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 1,
    resizeMode: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
  container: {
    flex: 1,
    opacity: 0.9,
    resizeMode: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
});

export default App;
