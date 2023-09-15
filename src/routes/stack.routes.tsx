import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTask from "../pages/CreateTask/create_task";
import Home from "../pages/Home/home";
import Login from "../pages/Login";

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
            {/* <Screen name="Home" component={Home} /> */}
            <Screen name="CreateTask" component={CreateTask} />
        </Navigator>
    )
}