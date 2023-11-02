import { HeaderComponent } from "../../components/header";
import { Tab, TabView } from "@rneui/base";
import { View, Text } from "react-native";
import { useState } from "react";
import MyTasks from "./myTasks";
import CreatedByMe from "./createdByMe";

export default function UpdateHistoric() {
    const [index, setIndex] = useState(0);

    return (
        <>
            <View style={{ backgroundColor: '#222328', paddingBottom: 20 }}><HeaderComponent /></View>

            <Tab
                value={index}
                onChange={setIndex}
                indicatorStyle={{ backgroundColor: '#DE0300' }}
                containerStyle={{ backgroundColor: '#222328'}}
                dense
            >
                <Tab.Item titleStyle={{ color: '#DE0300', fontSize: 17, fontFamily: "Poppins_400Regular" }}>Minhas Tasks</Tab.Item>
                <Tab.Item titleStyle={{ color: '#DE0300', fontSize: 17, fontFamily: "Poppins_400Regular" }}>Minhas Alterações</Tab.Item>
            </Tab>

            <TabView value={index} onChange={setIndex} containerStyle={{ backgroundColor: '#222328' }}>
                <TabView.Item>
                    <View style={{ width: '100%' }}>
                        <MyTasks />
                    </View>
                </TabView.Item>
                <TabView.Item>
                    <CreatedByMe />
                </TabView.Item>
            </TabView>
        </>
    )
}