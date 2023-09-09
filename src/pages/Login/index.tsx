import { Container, ErrorMessage, InputsContainer, LoginContainer, Logo, TabsContainer } from './styled';
import oracleLogo from "../../assets/oracle.png"
import { Button } from '../../components/button/button';
import Input from '../../components/input/input';
import React, { useState } from "react"
import { useAuth } from '../../hooks/auth';
import { AuthPropsLogin } from '../../interfaces/auth';


export default function Login() {

    const { signIn } = useAuth()

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
        <Container>
            <Logo source={oracleLogo} resizeMode='contain' />
            <TabsContainer>
                <Button
                    title='Log In'
                    type='clear'
                    color='red'
                    borderColor='transparent'
                    onPress={() => { console.log('LogIn') }}
                />
                <Button
                    title='Sign Up'
                    type='clear'
                    borderColor='transparent'
                    onPress={() => { console.log('LogIn') }}
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
                            setValues({ ...values, email: e })
                        }
                        textColor='#000'
                    />
                    <Input
                        iconL='envelope'
                        errorMsg={
                            errorStatus.password ? 'Password is required' : ''
                        }
                        password={true}
                        placeholder='Password'
                        onChange={(e) =>
                            setValues({ ...values, password: e })
                        } textColor='#000'
                    />
                </InputsContainer>
                {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                <Button
                    title='Log In'
                    type='solid'
                    borderColor='red'
                    backgroundColor='red'
                    onPress={handleSubmit}
                />
            </LoginContainer>
        </Container>
    );
}