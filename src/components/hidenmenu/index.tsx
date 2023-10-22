import { useState } from "react"
import { IHidenMenu } from "../../interfaces/hidenmenu"
import { IconModel } from "../icons"
import { Container, ContainerIcons } from "./style"

export const HidenMenu = ({ option, open }: IHidenMenu) => {


    return (
        <Container>
            <ContainerIcons>
                {option.map((buttons) => {
                    return (
                        <IconModel
                            onPress={() => { buttons.function() }}
                            IconColor={buttons.color}
                            iconName={buttons.name}
                            IconSize={25}
                            icon={buttons.icon}
                        />
                    )
                })}
            </ContainerIcons>
            <IconModel
                onPress={open}
                IconColor={"#000"}
                IconSize={25}
                icon='Entypo'
                iconName='chevron-right'
            />
        </Container>
    )
}