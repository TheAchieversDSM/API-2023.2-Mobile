import { View } from "react-native";
import { HeaderComponent } from "../../components/header";
import { Container, Email, Logout, Nome } from "./styled";
import { Divider } from "@rneui/themed";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";
import { useEffect, useState } from "react";
import serviceUser from "../../service/user";
import { IGetUserByIdResp } from "../../interfaces/user";
import { TouchableOpacity } from "react-native";

export default function Usuario() {
    const { userToken } = useAuth();
    const { id } = decodeJsonWebToken(String(userToken));
    const [usuario, setUsuario] = useState<IGetUserByIdResp>();
    const { signOut } = useAuth();
    
    const handleLogout = async () => {
        await signOut();
        
    };
    
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await serviceUser.getUserById({ userId: id });
                if (response) {
                    setUsuario(response.data.data);
                } else {
                    console.error("Erro ao buscar tarefas do usuário");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);
    
    return(
        <>
            <View style={{backgroundColor: '#222328'}}><HeaderComponent/></View>
            <Container>

                <Nome>{usuario?.name}</Nome>
                <Email>{usuario?.email}</Email>
                
                <TouchableOpacity>
                    <Logout>Editar</Logout>
                </TouchableOpacity>

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#747474"
                    width={1}
                    orientation="horizontal"
                />

                <TouchableOpacity onPress={handleLogout}>
                    <Logout>Log out</Logout>
                </TouchableOpacity>

            </Container>
        </>
    )
}