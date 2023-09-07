import React from 'react';
import { Container, ErrorMessage, InputsContainer, LoginContainer, Logo, TabsContainer } from './styled';
import oracleLogo from "../../assets/oracle.png"
import { Button } from '../../components/button/button';
import Input from '../../components/input/input';
import { useState } from "react"


export default function Login() {

    const [errorMessage, setErrorMessage] = useState("")

    const [errorStatus, setErrorStatus] = useState({
        email: false,
        password: false
    })


    const checkFields = (values: any): boolean => {
        const newErrorStatus = {
            email: values.email === '',
            password: values.password === ''
        };

        setErrorStatus(newErrorStatus);

        return newErrorStatus.email || newErrorStatus.password;
    };

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
                        textColor='#000'
                        onChange={(e) => { }}
                    />
                    <Input
                        iconL='envelope'
                        errorMsg={errorStatus.password ? 'Password is required' : ''}
                        password={true}
                        placeholder='Password'
                        textColor='#000'
                        onChange={(e) => { }}
                    />
                </InputsContainer>
                {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                <Button
                    title='Log In'
                    type='solid'
                    borderColor='red'
                    backgroundColor='red'
                    onPress={() => { }}
                />
            </LoginContainer>
        </Container>
    );
}