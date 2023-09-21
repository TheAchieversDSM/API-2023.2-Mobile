import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTask from "../pages/CreateTask/index";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ToDo from "../pages/ToDo";
import { TabsRoutes } from "./tabs.routes";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            initialRouteName="Tabs"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#393939'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 20
                },
            }}
        >
            <Screen name="Tabs" component={TabsRoutes} options={{ headerShown: false }} ></Screen>
        </Navigator>
    )
}