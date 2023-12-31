import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { renderBottomTab } from "../components/bottomtab";
import { TabBarIconProps } from "../interfaces/tabs";
import CreateTask from "../pages/CreateTask";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";

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
                    height: "100%"
                },
                tabBarStyle: {
                    backgroundColor: "#F2F2F2",
                    height: 55,
                    alignContent: "center"
                }
            }}
        >
            <Tab.Screen
                key={"home"}
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab({
                            icons: "FontAwesome",
                            name: "home",
                            isPlusIcon: false,
                            focused: focused,
                            nameScreen: "Home",
                        }),
                }}
            />
            <Tab.Screen
                key={"ToDo"}
                name="ToDo"
                component={ToDo}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab({
                            icons: "FontAwesome",
                            name: "tasks",
                            isPlusIcon: false,
                            focused: focused,
                            nameScreen: "Tarefas",
                        }),
                }}
            />
            <Tab.Screen
                key={"createTask"}
                name="CreateTask"
                component={CreateTask}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab({
                            icons: "Entypo",
                            name: "plus",
                            isPlusIcon: true,
                            focused,
                            nameScreen: "",
                        }),
                }}
            /> 
            <Tab.Screen
                key={"TDashboard"}
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab({
                            icons: "FontAwesome",
                            name: "bar-chart",
                            isPlusIcon: false,
                            focused: focused,
                            nameScreen: "Dash",
                        }),
                }}
            />
            <Tab.Screen
                key={"Usuário"}
                name="Usuario"
                component={Usuario}
                options={{
                    tabBarIcon: ({ focused }: TabBarIconProps) =>
                        renderBottomTab({
                            icons: "FontAwesome",
                            name: "user",
                            isPlusIcon: false,
                            focused: focused,
                            nameScreen: "Perfil",
                        }),
                }}
            />
        </Tab.Navigator>
    )
}
