import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIconProps } from "../interfaces/tabs";
import Home from "../pages/Home";
import { renderBottomTab } from "../components/bottomtab";
import ToDo from "../pages/ToDo";
import CreateTask from "../pages/CreateTask";

const Tab = createBottomTabNavigator();


export function TabsRoutes() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIconStyle: {
                    width: "100%",
                },
            }}
        >
            <Tab.Screen
                key={"home"}
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab('home', focused, "Home"),
                }}
            />
            <Tab.Screen
                key={"createTask"}
                name="createTask"
                component={CreateTask}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab('plus', focused),
                }}
            />
            <Tab.Screen
                key={"ToDo"}
                name="Afazeres"
                component={ToDo}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab('tasks', focused, "Tarefas"),
                }}
            />
        </Tab.Navigator>
    )
}
