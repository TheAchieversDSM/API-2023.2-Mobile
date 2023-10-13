import { ButtonContainer, Container, InputsContainer, Logo, Scroll, SignUpContainer, TabsContainer } from "./styled";
import { IResponseCadastro } from "../../interfaces/functions";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/button/button";
import { verifyPasswordMatch } from "../../utils/utils";
import { ToastComponent } from "../../components/toast";
import { ICreateUser } from "../../interfaces/user";
import oracleLogo from "../../assets/oracle.png";
import Input from "../../components/input/input";
import serviceUser from "../../service/user";
import React, { useState } from 'react';
import { View } from "react-native";

export function SignUp() {

    const navigate = useNavigation()

    const [data, setData] = useState<ICreateUser>({
        email: "",
        name: "",
        password: "",
        rPassword: ""
    })

    const [errorMessage, setErrorMessage] = useState({
        password: "",
        email: ""
    })
    const [errorStatus, setErrorStatus] = useState({
        email: false,
        password: false,
        rPassword: false,
        name: false
    })

    const checkFields = (values: ICreateUser): boolean => {
        const newErrorStatus = {
            email: values.email === "",
            name: values.name === "",
            password: values.password === "",
            rPassword: values.rPassword === "",
        };
        setErrorStatus(newErrorStatus);
        return newErrorStatus.email || newErrorStatus.password || newErrorStatus.name || newErrorStatus.rPassword;
    };


    const handleSubmit = async (data: ICreateUser) => {
        try {
            const validate = verifyPasswordMatch(data)
            if (checkFields(data)) {
                return
            } else {
                setErrorMessage({ email: "", password: "" })
                if (!validate) {
                    return setErrorMessage({ email: "", password: "As senhas são diferentes. Tente novamente." })
                }
                const error: IResponseCadastro | undefined = await serviceUser.createUser(data)
                setErrorMessage({ email: String(error?.erro), password: "" })
                if (error?.validacao) {
                    ToastComponent({ type: 'success', title: 'Usuário cadastrado!' })

                    navigate.navigate("Login")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Scroll>
            <Container>
                <Logo source={oracleLogo} resizeMode='contain' />
                <TabsContainer>
                    <Button
                        title='Login'
                        type='clear'
                        borderColor='transparent'
                        onPress={() => { navigate.navigate("Login") }}
                        fontSize={20}
                    />
                    <Button
                        title='Cadastro'
                        type='clear'
                        color='#DE0300'
                        borderColor='transparent'
                        onPress={() => { }}
                        fontSize={20}
                    />
                </TabsContainer>
                <SignUpContainer>
                    <InputsContainer>
                        <Input
                            placeholder={"Nome"}
                            textColor="#000"
                            iconL="user"
                            errorMsg={errorStatus.name ? "Nome é obrigatório" : ""}
                            onChange={(e) => setData({ ...data, name: e.nativeEvent.text })}
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                            marginTop={20}
                            color="#DE0300"
                        />

                        <View style={{ marginTop: 10 }}/>
                        
                        <Input
                            placeholder={"E-mail"}
                            textColor="#000"
                            iconL="envelope"
                            errorMsg={errorStatus.email ?
                                errorMessage.email ?
                                    errorMessage.email : "Email é obrigatório"
                                : errorMessage.email}
                            onChange={(e) => setData({ ...data, email: e.nativeEvent.text })}
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}                            
                            color="#DE0300"
                        />

                        <View style={{ marginTop: 10 }}/>

                        <Input
                            placeholder={"Senha"}
                            password
                            textColor="#000"
                            errorMsg={errorStatus.password ?
                                errorMessage.password ?
                                    errorMessage.password : "Senha é obrigatória"
                                : errorMessage.password}
                            onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                            iconL={"lock"}
                            color="#DE0300"
                        />

                        <View style={{ marginTop: 10 }}/>
                        
                        <Input
                            placeholder={"Repetir senha"}
                            password
                            textColor="#000"
                            errorMsg={errorStatus.rPassword ?
                                errorMessage.password ?
                                    errorMessage.password : "Senha é obrigatória"
                                : errorMessage.password}
                            onChange={(e) => setData({ ...data, rPassword: e.nativeEvent.text })}
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: 15 }}
                            iconL={"lock"}
                            marginBottom={-5}
                            color="#DE0300"
                        />
                    </InputsContainer>
                    <ButtonContainer>
                        <Button
                            title='Cadastrar'
                            type='solid'
                            borderColor='#DE0300'
                            backgroundColor='#DE0300'
                            onPress={() => handleSubmit(data)}
                        />
                    </ButtonContainer>
                </SignUpContainer>
            </Container>
        </Scroll>

    )
}
