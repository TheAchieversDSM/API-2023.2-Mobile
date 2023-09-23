import { ButtonContainer, Container, InputsContainer, Logo, Scroll, SignUpContainer, TabsContainer } from "./styled";
import { IResponseCadastro } from "../../interfaces/functions";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/button/button";
import { verifyPasswordMatch } from "../../utils/utils";
import { ICreateUser } from "../../interfaces/user";
import oracleLogo from "../../assets/oracle.png";
import Input from "../../components/input/input";
import serviceUser from "../../service/user";
import React, { useState } from 'react';

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
                    return setErrorMessage({ email: "", password: "The passwords do not match." })
                }
                const error: IResponseCadastro | undefined = await serviceUser.createUser(data)
                setErrorMessage({ email: String(error?.erro), password: "" })
                if (error?.validacao) {
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
                        title='Log In'
                        type='clear'
                        borderColor='transparent'
                        onPress={() => { navigate.navigate("Login") }}
                        fontSize={20}
                    />
                    <Button
                        title='Sign Up'
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
                            placeholder={"Name"}
                            textColor="#000"
                            iconL="user"
                            errorMsg={errorStatus.name ? "Name is required" : ""}
                            onChange={(e) => setData({ ...data, name: e.nativeEvent.text })}
                            marginTop={20}
                            color="#DE0300"
                        />
                        <Input
                            placeholder={"E-mail"}
                            textColor="#000"
                            iconL="envelope"
                            errorMsg={errorStatus.email ?
                                errorMessage.email ?
                                    errorMessage.email : "Email is required"
                                : errorMessage.email}
                            onChange={(e) => setData({ ...data, email: e.nativeEvent.text })}
                            color="#DE0300"
                        />
                        <Input
                            placeholder={"Password"}
                            password
                            textColor="#000"
                            errorMsg={errorStatus.password ?
                                errorMessage.password ?
                                    errorMessage.password : "Password is required"
                                : errorMessage.password}
                            onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
                            iconL={"lock"}
                            color="#DE0300"
                        />
                        <Input
                            placeholder={"Repeat Password"}
                            password
                            textColor="#000"
                            errorMsg={errorStatus.rPassword ?
                                errorMessage.password ?
                                    errorMessage.password : "Password is required"
                                : errorMessage.password}
                            onChange={(e) => setData({ ...data, rPassword: e.nativeEvent.text })}
                            iconL={"lock"}
                            marginBottom={-5}
                            color="#DE0300"
                        />
                    </InputsContainer>
                    <ButtonContainer>
                        <Button
                            title='Sign Up'
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
