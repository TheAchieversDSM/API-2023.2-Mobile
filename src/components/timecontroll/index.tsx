import React, { useState } from "react";
import { OverlaySyld, Container, TaskName, DescContainer, DescText, DescTimes, ButtonCotainer } from "./styled";
import { ITimeModal } from "../../interfaces/timermodal";
import Input from "../input/input";
import { Button } from "../button/button";

export const TimerModal = ({ view, onBackdropPress, taskName }: ITimeModal) => {
    return (
        <OverlaySyld isVisible={view} onBackdropPress={onBackdropPress}>
            <Container>
                <TaskName>{taskName}</TaskName>
                <Input
                    iconL='clock-o'
                    errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                    placeholder='Tempo Gasto'
                    onChange={(e) =>
                        console.log(e.nativeEvent.text)
                    }
                    textColor='#000'
                    color='#DE0300'
                />
                <DescContainer>
                    <DescText>Use o formato: 2w 4d 6h 45min</DescText>
                    <DescTimes>w = Semanas</DescTimes>
                    <DescTimes>d = Dias</DescTimes>
                    <DescTimes>h = Horas</DescTimes>
                    <DescTimes>m = Minutos</DescTimes>
                </DescContainer>
            </Container>
            <ButtonCotainer>
                <Button
                    width={100}
                    color="#000"
                    title="Salvar"
                    onPress={() => console.log("Salvar")}
                />
                <Button
                    width={100}
                    title="Cancelar"
                    onPress={onBackdropPress}
                    backgroundColor="#DE0300"
                    borderColor="transparent"
                />
            </ButtonCotainer>
        </OverlaySyld>
    )
}