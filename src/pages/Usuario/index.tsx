import { View } from "react-native";
import { HeaderComponent } from "../../components/header";
import { Container, ContainerOptions, Email, Logout, Nome } from "./styled";
import { Divider } from "@rneui/themed";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";
import { useEffect, useState } from "react";
import serviceUser from "../../service/user";
import { IGetUserByIdResp } from "../../interfaces/user";
import { TouchableOpacity } from "react-native";
import UserModal from "../../components/userModal";
import { ToastComponent } from "../../components/toast";
import { IconModel } from "../../components/icons";

export default function Usuario() {
    const { userToken } = useAuth();
    const { id } = decodeJsonWebToken(String(userToken));
    const [usuario, setUsuario] = useState<IGetUserByIdResp>();
    const { signOut } = useAuth();
    const [reloadUserData, setReloadUserData] = useState(false);

    const handleLogout = async () => {
        await signOut();

        ToastComponent({ type: 'info', title: 'Até logo!' })
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await serviceUser.getUserById({ userId: id });
                if (response) {
                    setUsuario(response.data.data);
                } else {
                    console.error("Erro ao buscar o usuário");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();

    }, [reloadUserData]);

    return (
        <>
            <View style={{ backgroundColor: '#222328' }}><HeaderComponent /></View>
            <Container>

                <Nome>{usuario?.name}</Nome>
                <Email>{usuario?.email}</Email>

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#747474"
                    width={1}
                    orientation="horizontal"
                />

                <ContainerOptions>
                    <UserModal
                        userId={id}
                        name={usuario?.name}
                        email={usuario?.email}
                        password={usuario?.password}
                        reloadUser={() => setReloadUserData(!reloadUserData)}
                    />
                </ContainerOptions>

                <ContainerOptions style={{ backgroundColor: '#DE0300'}}>
                    <TouchableOpacity onPress={handleLogout} style={{ display: "flex", flexDirection: "row" }}>
                        <IconModel
                            IconColor={"white"}
                            IconSize={22}
                            icon='MaterialIcons'
                            iconName='logout'
                        />
                        <Logout style={{ fontSize: 17, marginLeft: 10, marginBottom: 5 }}>Logout</Logout>
                    </TouchableOpacity>
                </ContainerOptions>
            </Container>
        </>
    )
}