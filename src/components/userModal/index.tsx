import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from "react-native";
import * as A from "./styled";
import { useEffect, useState } from "react";
import Input from '../input/input';
import { IconModel } from "../icons";
import { IGetUserByIdResp, IUpdateUser } from "../../interfaces/user";
import serviceUser from "../../service/user";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";

export default function UserModal(props: IUpdateUser) {
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const { userToken } = useAuth();
    const { id } = decodeJsonWebToken(String(userToken));
    const [data, setData] = useState({} as IUpdateUser)
    const [reloadUser, setReloadUser] = useState(false);
    const [usuario, setUsuario] = useState<IGetUserByIdResp>();

    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    
    const toggleOverlay = () => {
        setVisible(!visible)
    };

    const handleSubmit = async (data: IUpdateUser) => {
        try {
            if (data) {
                await serviceUser.updateUser({
                    name: name,
                    email: email,
                    password: password,
                    userId: id,
                    reloadUser: function (): void {
                        throw new Error("Function not implemented.");
                    }
                })
                setReloadUser(true)
                props.reloadUser();
            }

            setEdit(false)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={toggleOverlay}>
                <A.Logout>Editar</A.Logout>
            </TouchableOpacity>

            <A.Modal isVisible={visible} onBackdropPress={toggleOverlay}>
                <A.GeneralView>
                    <A.ViewIcons>
                        <A.ViewIcon>
                            <IconModel
                                onPress={() =>{ 
                                    handleSubmit(data);
                                    toggleOverlay();
                                }}
                                IconColor={"#000"}
                                IconSize={26}
                                icon='AntDesign'
                                iconName='check'
                            />
                            <IconModel
                                onPress={() => {
                                    toggleOverlay();
                                    setEdit(false);
                                  }}
                                IconColor={"#000"}
                                IconSize={25}
                                icon='AntDesign'
                                iconName='close'
                            />
                        </A.ViewIcon>
                    </A.ViewIcons>
                    
                    <A.TaskDescT>Nome:</A.TaskDescT>
                    <A.InputView>
                        <Input
                            value={name}
                            placeholder={''}
                            textColor='#000'
                            color='#C74634'
                            iconL='user' 
                            onChange={(e) => { setName(e.nativeEvent.text) }}
                        />
                    </A.InputView>
                    <A.TaskDescT>Email:</A.TaskDescT>
                    <A.InputView>
                        <Input
                            value={email}
                            placeholder={''}
                            textColor='#000'
                            color='#C74634'
                            iconL='envelope' 
                            onChange={(e) => { setEmail(e.nativeEvent.text) }}
                        />
                    </A.InputView>
                    <A.TaskDescT>Senha:</A.TaskDescT>
                    <A.InputView>
                        <Input
                            value={password}
                            placeholder={'Insira sua nova senha'}
                            textColor='#000'
                            color='#C74634'
                            onChange={(e) => { setPassword(e.nativeEvent.text) }}
                            iconL='lock' 
                        />
                    </A.InputView>
                    {/* <A.TaskDescT>Repita a senha:</A.TaskDescT>
                    <A.InputView>
                        <Input
                            placeholder={''}
                            textColor='#000'
                            color='#C74634'
                            iconL='lock' onChange={function (e: NativeSyntheticEvent<TextInputChangeEventData>): void {
                                throw new Error("Function not implemented.");
                            } }
                        />
                    </A.InputView> */}
                </A.GeneralView>
            </A.Modal>
        </>
    )
}