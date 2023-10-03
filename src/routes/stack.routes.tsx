import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabsRoutes } from "./tabs.routes";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";
import CreateTask from "../pages/CreateTask";
import Dashboard from "../pages/Dashboard";

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
        </Navigator>
    )
}