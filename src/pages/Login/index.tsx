import { ButtonContainer, Container, ErrorMessage, InputsContainer, LoginContainer, Logo, Scroll, TabsContainer } from './styled';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/button/button';
import { AuthPropsLogin } from '../../interfaces/auth';
import Input from '../../components/input/input';
import oracleLogo from "../../assets/oracle.png";
import { useAuth } from '../../hooks/auth';
import React, { useState } from "react";
import { View } from 'react-native';
import { ToastComponent } from '../../components/toast';


export default function Login() {

    const { signIn } = useAuth()

    const navigate = useNavigation()

    const [values, setValues] = useState({
        email: '',
        password: ''
    } as AuthPropsLogin)

    const [errorMessage, setErrorMessage] = useState("")

    const [errorStatus, setErrorStatus] = useState({
        email: false,
        password: false
    })

    const checkFields = (values: AuthPropsLogin): boolean => {
        const newErrorStatus = {
            email: values.email === '',
            password: values.password === ''
        };

        setErrorStatus(newErrorStatus);

        return newErrorStatus.email || newErrorStatus.password;
    };

    const handleSubmit = async () => {
        setErrorMessage("")
        try {
            if (checkFields(values)) {
                return
            } else {
                const error = await signIn(values);
                ToastComponent({ type: 'info', title: 'Bem-vindo!' })
                if (error) setErrorMessage(String(error));
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
        }
    }

    return (
        <Scroll>
            <Container>
                <Logo source={oracleLogo} />
                <TabsContainer>
                    <Button
                        title='Login'
                        type='clear'
                        color='#DE0300'
                        borderColor='transparent'
                        onPress={() => { }}
                        fontSize={20}
                    />
                    <Button
                        title='Cadastro'
                        type='clear'
                        borderColor='transparent'
                        onPress={() => { navigate.navigate("SignUp") }}
                        fontSize={20}
                    />
                </TabsContainer>
                <LoginContainer>
                    <InputsContainer>
                        <Input
                            iconL='envelope'
                            errorMsg={
                                errorStatus.email ? "Email é obrigatório" : ""
                            }
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                            placeholder='Email'
                            onChange={(e) =>
                                setValues({ ...values, email: e.nativeEvent.text })
                            }
                            textColor='#000'
                            color='#DE0300'
                        />

                        <View style={{ marginTop: 10 }} />

                        <Input
                            iconL='lock'
                            errorMsg={
                                errorStatus.password ? 'Senha é obrigatória' : ''
                            }
                            errorStyle={{ marginLeft: 30, fontSize: 15, marginTop: -5 }}
                            password={true}
                            placeholder='Senha'
                            onChange={(e) =>
                                setValues({ ...values, password: e.nativeEvent.text })
                            }
                            textColor='#000'
                            color='#DE0300'
                        />
                    </InputsContainer>
                    {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                    <ButtonContainer>
                        <Button
                            title='Entrar'
                            type='solid'
                            borderColor='#DE0300'
                            backgroundColor='#DE0300'
                            onPress={handleSubmit}
                        />
                    </ButtonContainer>
                </LoginContainer>
            </Container>
        </Scroll>
    );
}