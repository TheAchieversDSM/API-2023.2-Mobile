import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home/home";

const {Screen, Navigator} = createNativeStackNavigator();

export function StackRoutes(){
    return (
        <Navigator>
            <Screen name="Home" component={Home}/>
        </Navigator>
    )
}