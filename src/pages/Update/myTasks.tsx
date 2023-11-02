import { IDynamicHistoric, IHistoricUpdate, IUpdate } from '../../interfaces/updatemodal';
import { Container, NoUpdate, TaskName } from './style';
import { decodeJsonWebToken } from '../../utils/utils';
import Collapse from '../../components/collapse';
import { View, ScrollView } from 'react-native';
import serviceTask from '../../service/task';
import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/auth";
import { Divider } from '@rneui/base';

export default function MyTasks() {
    const { userToken } = useAuth();
    const { id } = decodeJsonWebToken(String(userToken));

    const [historic, setHistoric] = useState<IDynamicHistoric>({} as IDynamicHistoric)
    const [names, setNames] = useState<Array<string>>()

    useEffect(() => {
        async function fetchUpdate() {
            try {
                const request = await serviceTask.getHistoricByOwner(id)
                if (request) setHistoric(request)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUpdate()
    }, [id])

    useEffect(() => {
        for (const date in historic) {
            setNames((prevNames) => {
                if (prevNames) {
                    if (!prevNames.includes(String(date))) {
                        return [...prevNames, String(date)];
                    } else {
                        return prevNames;
                    }
                } else {
                    return [String(date)];
                }
            });
        }
    }, [historic])

    return (
        <>
            <View style={{ marginTop: 20 }} />
            <ScrollView style={{ marginBottom: 50 }}>
                {names ?
                    names?.map(tasks => {
                        return (
                            <>
                                <TaskName>{tasks}</TaskName>

                                {historic[tasks].map(values => {
                                    return (
                                        <Container style={{ margin: 0 }}>
                                            <Collapse {...values} />
                                            <Divider style={{ marginBottom: 10 }} />
                                        </Container>
                                    )
                                })}
                            </>
                        )
                    })
                    :
                    <NoUpdate>Não há histórico de atualização para as minhas tarefas.</NoUpdate>
                }
            </ScrollView>
        </>
    )
}