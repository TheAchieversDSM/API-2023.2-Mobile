import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import { SignUp } from "../pages/SignUp";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name="Login" component={Login} options={{ headerShown: false, animation: "none" }}  />
            <Screen name="SignUp" component={SignUp} options={{ headerShown: false, animation: "none"}} />
        </Navigator>
    )
}