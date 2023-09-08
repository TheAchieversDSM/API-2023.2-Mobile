import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Navigator>
    )
}