import * as DocumentPicker from 'expo-document-picker'
import { ScrollView, Text, View } from 'react-native'
import { IGetTaskFiles } from '../../interfaces/task'
import { Card, Button, Icon } from '@rneui/themed'
import { IGetUser } from '../../interfaces/user'
import { Title, Modal, NoUpdate } from './style'
import serviceTask from '../../service/task'
import { File } from '../../interfaces/file'
import { useEffect, useState } from 'react'
import { ToastComponent } from '../toast'
import { Divider } from '@rneui/base'
import { IconModel } from '../icons'

interface IFileModal {
    id: IGetUser
    idTask: number
    view: boolean
    onBackdropPress: () => void
}

export const FileModal = ({ onBackdropPress, ...props }: IFileModal) => {
    const [visible, setVisible] = useState(props.view);
    const [imgTypes, setImgTypes] = useState(['png', 'jpeg', 'jpg', 'gif', 'svg'])
    const [filesTask, setFilesTask] = useState<IGetTaskFiles>({ id: props.idTask, userId: props.id.userId, files: [] })
    const [files, setFiles] = useState<File[]>([]);
    const [upload, setUplaod] = useState<boolean>(false)
    const [reload, setReload] = useState(false)

    const toggleOverlay = () => {
        setVisible(!visible)
        onBackdropPress()
    };

    const handleDeleteFile = async (idTask: number, idFile: number) => {
        try {
            await serviceTask.deleteFile(idTask, idFile)

            ToastComponent({ type: 'error', title: 'Arquivo deletado!' })

            setReload(true);
        } catch (error) {
            console.error("Erro ao atualizar o estado da subtarefa:", error)
        }
    }

    const handlePickFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({ multiple: true });
        if (result.assets) {
            const uploadFiles: DocumentPicker.DocumentPickerAsset[] = result.assets;
            const mapFilesAsync = async (): Promise<File[]> => {
                const mappedFiles: File[] = await Promise.all(
                    uploadFiles.map(async (file) => {
                        try {
                            const response = await fetch(file.uri);
                            const blob = await response.blob();
                            const mappedFile: File = {
                                buffer: blob,
                                mimetype: file.mimeType || '',
                                originalname: file.name,
                                size: file.size || 0,
                            };
                            return mappedFile;
                        } catch (error) {
                            console.error('Error mapping file:', error);
                            throw error;
                        }
                    })
                );

                return mappedFiles;
            };

            await mapFilesAsync().then((files) => {
                setFiles(prevFiles => {
                    const newFiles = [...prevFiles, ...files];
                    return newFiles;
                });
            });

            ToastComponent({ type: 'success', title: 'Upload feito com sucesso!' })

            setUplaod(true)
        }
    };

    useEffect(() => {
        const uploadFile = async () => {
            if (!upload && files.length === 0) {
                return
            }
            await serviceTask.uploadFiles(Number(props.id), files)
        }
        setFiles([])
        setUplaod(false)
        return () => {
            uploadFile()
        }
    }, [upload])

    useEffect(() => {
        async function fetchFile() {
            try {
                const request = await serviceTask.getTaskUser(props.id)
                if (request !== undefined) {
                    request.map((task) => {
                        if (task.id == filesTask.id) {
                            setFilesTask((prevState) => ({
                                ...prevState,
                                files: task.files || []
                            }))
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchFile()
    }, [props.id, reload])

    return (
        <Modal isVisible={visible} onBackdropPress={toggleOverlay}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <IconModel
                    style={{ marginTop: 3 }}
                    onPress={handlePickFile}
                    IconColor={"#000"}
                    IconSize={27}
                    icon='Feather'
                    iconName='upload'
                />

                <View style={{ marginHorizontal: 10 }} />

                <IconModel
                    style={{ marginTop: 3 }}
                    onPress={toggleOverlay}
                    IconColor={"#000"}
                    IconSize={27}
                    icon='AntDesign'
                    iconName='close'
                />
            </View>

            <ScrollView style={filesTask?.files ? { maxHeight: 500, width: 320 } : { maxHeight: 100, width: 320 }}>
                {filesTask?.files.length > 0 ?
                    <>
                        {filesTask.files.filter(task => imgTypes.includes(task.fileType)) ?
                            <>
                                <Title>Imagens</Title>
                                <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
                                    {filesTask?.files?.map(file => {
                                        return (
                                            <>
                                                {imgTypes.includes(file.fileType) ?
                                                    <>
                                                        <Card containerStyle={{ width: 200, alignSelf: 'center', marginRight: 10 }}>
                                                            <Card.Title style={{fontFamily: 'Poppins_600Regular', fontSize: 16}}>{file.fileName.split('.')[0]}</Card.Title>

                                                            <Card.Divider />

                                                            <Card.Image style={{ padding: 0, width: '100%', height: 100 }} source={{ uri: file.url }} />

                                                            <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600Regular' }}>
                                                                {file.fileType} | {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                                                            </Text>

                                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                <IconModel
                                                                    iconName={'download'}
                                                                    icon={'Feather'}
                                                                    IconColor={'black'}
                                                                    IconSize={30}
                                                                />

                                                                <IconModel
                                                                    onPress={() => handleDeleteFile(props.idTask, file.id !== undefined ? file.id : 0)}
                                                                    iconName={'trash-o'}
                                                                    icon={'FontAwesome'}
                                                                    IconColor={'#DE0300'}
                                                                    IconSize={30}
                                                                />
                                                            </View>
                                                        </Card>
                                                    </>
                                                    : null
                                                }
                                            </>)
                                    })}
                                </ScrollView>

                                <Divider style={{ width: 300, marginVertical: 10, alignSelf: 'center' }} />
                            </>
                            : null
                        }

                        {filesTask.files.filter(task => !imgTypes.includes(task.fileType)) ?
                            <>
                                <Title>Arquivos</Title>

                                <ScrollView horizontal={true}>
                                    {filesTask?.files?.map(file => {
                                        return (
                                            <>
                                                {!imgTypes.includes(file.fileType) ?
                                                    <>
                                                        <Card containerStyle={{ width: 200, alignSelf: 'center', marginRight: 10 }}>
                                                            <Card.Title style={{fontFamily: 'Poppins_600Regular', fontSize: 16}}>{file.fileName.split('.')[0]}</Card.Title>

                                                            <Card.Divider />

                                                            <Text style={{ marginBottom: 10, fontFamily: 'Poppins_600Regular'  }}>
                                                                {file.fileType} | {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                                                            </Text>

                                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                <IconModel
                                                                    iconName={'download'}
                                                                    icon={'Feather'}
                                                                    IconColor={'black'}
                                                                    IconSize={30}
                                                                />

                                                                <IconModel
                                                                    onPress={() => handleDeleteFile(props.idTask, file.id !== undefined ? file.id : 0)}
                                                                    iconName={'trash-o'}
                                                                    icon={'FontAwesome'}
                                                                    IconColor={'#DE0300'}
                                                                    IconSize={30}
                                                                />
                                                            </View>
                                                        </Card>
                                                    </>
                                                    : null
                                                }
                                            </>)
                                    })}
                                </ScrollView>
                            </>
                            : null
                        }
                    </>
                    :
                    <NoUpdate>Não há arquivos para essa tarefa.</NoUpdate>
                }
            </ScrollView>
        </Modal>
    )
}