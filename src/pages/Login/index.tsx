import { ButtonContainer, Container, ErrorMessage, InputsContainer, LoginContainer, Logo, Scroll, TabsContainer } from './styled';
import oracleLogo from "../../assets/oracle.png"
import { Button } from '../../components/button/button';
import Input from '../../components/input/input';
import React, { useState } from "react"
import { useAuth } from '../../hooks/auth';
import { AuthPropsLogin } from '../../interfaces/auth';
import { useNavigation } from '@react-navigation/native';


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
                        title='Log In'
                        type='clear'
                        color='#DE0300'
                        borderColor='transparent'
                        onPress={() => { }}
                        fontSize={20}
                    />
                    <Button
                        title='Sign Up'
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
                                errorStatus.email ? "Email is required" : ""
                            }
                            placeholder='Email'
                            onChange={(e) =>
                                setValues({ ...values, email: e.nativeEvent.text })
                            }
                            textColor='#000'
                            color='#DE0300'
                        />
                        <Input
                            iconL='lock'
                            errorMsg={
                                errorStatus.password ? 'Password is required' : ''
                            }
                            password={true}
                            placeholder='Password'
                            onChange={(e) =>
                                setValues({ ...values, password: e.nativeEvent.text })
                            } 
                            textColor='#000'
                            color='#DE0300'
                            marginBottom={-5}
                        />
                    </InputsContainer>
                    {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                    <ButtonContainer>
                        <Button
                            title='Log In'
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