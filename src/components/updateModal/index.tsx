import { IDynamicHistoric, IHistoricUpdate } from "../../interfaces/updatemodal"
import serviceTask from "../../service/task"
import { useEffect, useState } from "react"
import { Modal, NoUpdate } from "./style"
import { ScrollView } from "react-native"
import { Divider } from "@rneui/base"
import Collapse from "../collapse"

interface IUpdate {
    id: number
    view: boolean
    onBackdropPress: () => void
}

export const UpdateModal = ({ onBackdropPress, ...props }: IUpdate) => {
    const [historic, setHistoric] = useState<IDynamicHistoric>({} as IDynamicHistoric)
    const [names, setNames] = useState<Array<string>>()
    const [visible, setVisible] = useState(props.view);

    const toggleOverlay = () => {
        setVisible(!visible)
        onBackdropPress()
    };

    useEffect(() => {
        async function fetchUpdate() {
            try {
                const request = await serviceTask.getHistoricTask(props.id)
                if (request) setHistoric(request)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUpdate()
    }, [props.id])

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
        <Modal isVisible={visible} onBackdropPress={toggleOverlay}>
            <ScrollView style={names ? { maxHeight: 500 } : { maxHeight: 100 }}>
                {names ?
                    names?.map(tasks => {
                        return (
                            historic[tasks].map(values => {
                                return (
                                    <>
                                        <Collapse {...values} />
                                        <Divider style={{ marginBottom: 10 }} />
                                    </>
                                )
                            })
                        )
                    })
                    :
                    <NoUpdate>Não há histórico de atualização para essa tarefa.</NoUpdate>
                }
            </ScrollView>
        </Modal>
    )
}