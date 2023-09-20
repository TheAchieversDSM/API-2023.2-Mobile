import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTask from "../pages/CreateTask/index";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ToDo from "../pages/ToDo";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            initialRouteName="Home"
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
            <Screen name="ToDo" component={ToDo} />
            <Screen name="Home" component={Home} />
            <Screen name="CreateTask" component={CreateTask} />  
        </Navigator>
    )
}