import React, { useEffect, useState } from "react";
import { OverlaySyld, Container, TaskName, DescContainer, DescText, DescTimes, ButtonCotainer } from "./styled";
import { ITimeModal } from "../../interfaces/timermodal";
import Input from "../input/input";
import { Button } from "../button/button";
import { timeCalculate } from "../../utils/utils";
import serviceTask from "../../service/task";

export const TimerModal = ({ view, onBackdropPress, task, reloadTasksData }: ITimeModal) => {
    const [state, setState] = useState({
        time: "",
        newTime: "",
        send: false,
        value: 0
    });

    useEffect(() => {
        const regex: RegExp = /(\d+[wdhm])/g;
        const matches: RegExpMatchArray | null = state.time.match(regex);
        if (state.time == "") {
            setState({ ...state, newTime: "", send: true, value: 0 })
        }
        if (matches && matches.length > 0) {
            const valoresEncontrados: string = matches.join(" ");
            const newTime = timeCalculate(valoresEncontrados)
            setState({ ...state, newTime: newTime.msg, send: false, value: newTime.time })
        } else {
            setState({ ...state, newTime: "", send: true, value: 0 })
        }
    }, [state.time])

    const handleSubmitTime = async () => {
        const newValue = task.timeSpent + state.value
        await serviceTask.tasktimeUpdateDto({
            id: task.id,
            timeSpent: newValue,
        });
        handleCloseModal();
        reloadTasksData();
    }

    const handleCloseModal = () => {
        onBackdropPress()
        setState({ time: "", newTime: "", send: false, value: 0 })
    }

    return (
        <OverlaySyld isVisible={view} onBackdropPress={handleCloseModal}>
            <Container>
                <TaskName>{task.name}</TaskName>
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
                    onPress={handleSubmitTime}
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