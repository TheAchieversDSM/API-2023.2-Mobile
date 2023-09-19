import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name="Login" component={Login} options={{ headerShown: false, animation: "none" }}  />
            <Screen name="SignUp" component={SignUp} options={{ headerShown: false, animation: "none"}} />
            <Screen name="Home" component={Home} options={{ headerShown: false, animation: "none"}} />
            <Screen name="To Do" component={ToDo} options={{ headerShown: false, animation: "none"}} />
        </Navigator>
    )
}