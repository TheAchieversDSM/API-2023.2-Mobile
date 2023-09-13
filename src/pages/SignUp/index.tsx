import { ButtonContainer, Container, InputsContainer, Logo, Scroll, SignUpContainer, TabsContainer } from "./styled";
import oracleLogo from "../../assets/oracle.png"
import { Button } from "../../components/button/button";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/input/input";
import { ScrollView } from "react-native";

export function SignUp() {

    const navigate = useNavigation()

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
                    />
                    <Button
                        title='Sign Up'
                        type='clear'
                        color='red'
                        borderColor='transparent'
                        onPress={() => { }}
                    />
                </TabsContainer>
                <SignUpContainer>
                    <InputsContainer>
                        <Input
                            placeholder={"Name"}
                            textColor="#000"
                            onChange={() => { }}
                            iconL="user"
                        />
                        <Input
                            placeholder={"E-mail"}
                            textColor="#000"
                            onChange={() => { }} iconL="envelope"
                        />
                        <Input
                            placeholder={"Password"}
                            password
                            textColor="#000"
                            onChange={() => { }}
                            iconL={"lock"}
                        />
                        <Input
                            placeholder={"Repeat Password"}
                            password
                            textColor="#000"
                            onChange={() => { }}
                            iconL={"lock"}
                        />
                    </InputsContainer>
                    <ButtonContainer>
                        <Button
                            title='Sign Up'
                            type='solid'
                            borderColor='red'
                            backgroundColor='red'
                            onPress={() => navigate.navigate("Login")}
                        />
                    </ButtonContainer>
                </SignUpContainer>
            </Container>
        </Scroll>

    )
}