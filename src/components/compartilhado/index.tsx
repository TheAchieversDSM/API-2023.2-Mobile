import { ListItem, SearchBar } from "@rneui/themed"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components"
import serviceUser from "../../service/user"
import serviceTask from "../../service/task"
import { ICompModal } from "../../interfaces/compmodal"
import * as S from "./styled"
import { useAuth } from "../../hooks/auth";
import { ScrollView } from "react-native"
import { Button } from "../button/button";
import { decodeJsonWebToken } from "../../utils/utils";

export const CompModal = ({view, onBackdropPress, reloadTasksData, taskid, userids}: ICompModal) => {
    const theme = useTheme();
    const { userToken } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { id } = decodeJsonWebToken(String(userToken))

    // const defaultChecked = userids?.map((user:any) => user?.id) || []

    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() =>{
        async function fetchAllUsers() {
            try {
                const response = await serviceUser.getAllUsers();
                if (response) {
                    let users = response.data;
                    users = users.filter((user: any) => user.id !== id);
                    
                    if(userids){
                        let select: any[] = []
                        select = users.map((userSelected: any) => {
                            return userids.some((user: any) => user.id === userSelected.id);
                        })                        
                        setSelectedItems(select)
                    }
            
                    setUsuarios(users)
                } else {
                    console.error("Erro ao buscar usuários");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllUsers();
    }, [])

    const getSelectedItems = () => {
        return usuarios
          .filter((user: any) =>
            user?.email.toLowerCase().includes(searchText.toLowerCase())
          )
          .filter((usuario: any, index) => selectedItems[index]);
      };

    const handleSubmitComp = async () => {
        const ids = getSelectedItems()?.map((user: any) => user.id)
        await serviceTask.shareTask(taskid, ids)
        handleCloseModal();
        reloadTasksData();
    }

    const handleCloseModal = () => {
        onBackdropPress()
    }
    
    return(
        <S.Modal isVisible={view} onBackdropPress={handleCloseModal}>
        <S.Container>
            <SearchBar
                placeholder="Pesquisar usuário..."
                containerStyle={{
                    backgroundColor: '#ffff',
                    borderWidth: 1,
                    borderTopColor: '#ffff',
                    borderLeftColor: '#ffff',
                    borderRightColor: '#ffff',
                    borderBottomColor: '#222328',
                    borderRadius: 0,
                    marginBottom: 20,
                }}
                inputContainerStyle={{
                    backgroundColor: '#ffff',
                }}
                inputStyle={{ fontFamily: theme.FONTS.Poppins_500Medium }}
                onChangeText={text => setSearchText(text)}
                value={searchText}
            />
            <S.ContAdd>
                <ScrollView>
                    {usuarios?.filter((user:any)=> user?.email.toLowerCase().includes(searchText.toLowerCase())).map((usuario: any, index) => (
                        <ListItem bottomDivider key={index}>
                            <ListItem.CheckBox
                                checked={selectedItems[index]}
                                onPress={() => {
                                    const updatedSelectedItems = [...selectedItems];
                                    updatedSelectedItems[index] = !selectedItems[index];
                                    setSelectedItems(updatedSelectedItems);
                                }}
                                checkedColor='#DE0300'
                                key={usuario.id}
                                textStyle={{fontFamily: theme.FONTS.Poppins_400Regular,}}
                            />
                            <ListItem.Content>
                                <ListItem.Title style={{fontFamily: theme.FONTS.Poppins_400Regular,}}>{usuario.email}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </S.ContAdd>

            <S.Texto>Usuários selecionados: </S.Texto>
            <S.ContLista>
                <ScrollView>
                    {getSelectedItems()?.map((selectedItem:any, index) => (
                    <S.UsersList key={index}>{selectedItem?.email}</S.UsersList>
                    ))}
                </ScrollView>
            </S.ContLista>
            <S.ButtonCotainer>
                <Button
                    width={100}
                    title="Salvar"
                    backgroundColor="#DE0300"
                    borderColor="transparent"
                    onPress={handleSubmitComp}
                    type="solid"
                />
                <Button
                    width={100}
                    title="Cancelar"
                    onPress={handleCloseModal}
                    type="clear"
                    borderColor="transparent"
                    backgroundColor="transparent"
                    color="#000"
                />
            </S.ButtonCotainer>
        </S.Container>
    </S.Modal>
    )
}