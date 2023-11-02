import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdateHistoric from "../pages/Update";
import CreateTask from "../pages/CreateTask";
import { TabsRoutes } from "./tabs.routes";
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";

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
            <Screen name="Home" component={Home} options={{ headerShown: false }} ></Screen>
            <Screen name="ToDo" component={ToDo} options={{ headerShown: false }} ></Screen>
            <Screen name="CreateTask" component={CreateTask} options={{ headerShown: false }} ></Screen>
            <Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} ></Screen>
            <Screen name="Usuario" component={Usuario} options={{ headerShown: false }} ></Screen>
            <Screen name="UpdateHistoric" component={UpdateHistoric} options={{ headerShown: false }} ></Screen>
        </Navigator>
    )
}