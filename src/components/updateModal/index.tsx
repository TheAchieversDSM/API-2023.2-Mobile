import { IDynamicHistoric, IHistoricUpdate } from "../../interfaces/updatemodal"
import serviceTask from "../../service/task"
import { useEffect, useState } from "react"
import { Divider } from "@rneui/base"
import Collapse from "../collapse"
import { Modal } from "./style"

interface IUpdate {
    id: number
    view: boolean
    onBackdropPress: () => void
}

export const UpdateModal = ({onBackdropPress, ...props}: IUpdate) => {
    const [historic, setHistoric] = useState<IDynamicHistoric>({} as IDynamicHistoric)
    const [dates, setDates] = useState<IHistoricUpdate[]>([])
    const [visible, setVisible] = useState(props.view);

    const toggleOverlay = () => {
        setVisible(!visible)
        onBackdropPress()
    };

    useEffect(() => {
        async function fetchUpdate() {
            try {
                const request = await serviceTask.getHistoricTask(props.id)
                console.log(request);
                if (request) setHistoric(request)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUpdate()
    }, [props.id])

    useEffect(() => {
        for (const date in historic) {
            setDates(historic[date])
        }
    }, [historic])

    return (
        <>
            <Modal isVisible={visible} onBackdropPress={toggleOverlay}>
                {dates?.map(tasks => {
                    return <Collapse {...tasks} />
                })}

                <Divider style={{ marginBottom: 10 }} />
            </Modal>
        </>
    )
}