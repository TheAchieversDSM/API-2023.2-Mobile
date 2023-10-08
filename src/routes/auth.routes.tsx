import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name="Login" component={Login} options={{ headerShown: false, animation: "none" }}  />
            <Screen name="SignUp" component={SignUp} options={{ headerShown: false, animation: "none"}} />
            <Screen name="Home" component={Home} options={{ headerShown: false, animation: "none"}} />
            <Screen name="ToDo" component={ToDo} options={{ headerShown: false, animation: "none"}} />
            <Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, animation: "none"}} />
            <Screen name="Usuario" component={Usuario} options={{ headerShown: false, animation: "none"}} />
        </Navigator>
    )
}