import { useState } from "react"
import { IHidenMenu } from "../../interfaces/hidenmenu"
import { IconModel } from "../icons"
import { Container, ContainerIcons } from "./style"
import { View } from "react-native"

export const HidenMenu = ({ option, open }: IHidenMenu) => {
    return (
        <Container>
            <ContainerIcons>
                {option.map((buttons) => {
                    return (
                        <>
                            <IconModel
                                onPress={() => { buttons.function() }}
                                IconColor={buttons.color}
                                iconName={buttons.name}
                                IconSize={buttons.size}
                                icon={buttons.icon}
                            />
                            <View style={{ marginHorizontal: 10 }} />
                        </>
                    )
                })}
                <View style={{ marginRight: -10 }} />
            </ContainerIcons>

            <View style={{ marginBottom: 15 }}>
                <IconModel
                    style={{ justifyContent: "center" }}
                    onPress={open}
                    IconColor={"#000"}
                    IconSize={23}
                    icon='Entypo'
                    iconName='chevron-thin-right'
                />
            </View>
        </Container>
    )
}