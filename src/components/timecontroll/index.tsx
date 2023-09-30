import React, { useEffect, useState } from "react";
import { OverlaySyld, Container, TaskName, DescContainer, DescText, DescTimes, ButtonCotainer } from "./styled";
import { ITimeModal } from "../../interfaces/timermodal";
import Input from "../input/input";
import { Button } from "../button/button";
import { timeCalculate } from "../../utils/utils";

export const TimerModal = ({ view, onBackdropPress, taskName }: ITimeModal) => {
    const [state, setState] = useState({
        time: "",
        newTime: "",
        send: false
    });
    useEffect(() => {
        const regex: RegExp = /(\d+[wdhm])/g;
        const matches: RegExpMatchArray | null = state.time.match(regex);
        if (state.time == "") {
            setState({ ...state, newTime: "", send: true })
        }
        if (matches && matches.length > 0) {
            const valoresEncontrados: string = matches.join(" ");
            const newTime = timeCalculate(valoresEncontrados)
            setState({ ...state, newTime: newTime.msg, send: false })
        }else{
            setState({ ...state, newTime: "", send: true })
        }
    }, [state.time])

    const handleCloseModal = () => {
        onBackdropPress()
        setState({ time: "", newTime: "", send: false  })
    }
    return (
        <OverlaySyld isVisible={view} onBackdropPress={handleCloseModal}>
            <Container>
                <TaskName>{taskName}</TaskName>
                <Input
                    iconL='clock-o'
                    errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                    placeholder='Tempo Gasto'
                    onChange={(e) =>
                        setState({ ...state, time: e.nativeEvent.text })
                    }
                    errorMsg={state.newTime}
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
                    type="clear"
                    borderColor="transparent"
                    backgroundColor="transparent"
                    onPress={() => console.log("Salvar")}
                    disable={state.send}
                />
                <Button
                    width={100}
                    title="Cancelar"
                    onPress={handleCloseModal}
                    backgroundColor="#DE0300"
                    borderColor="transparent"
                />
            </ButtonCotainer>
        </OverlaySyld>
    )
}