import React, { useState } from "react";
import { Modal, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";
import { decodeJsonWebToken } from "../../utils/utils";
import { useAuth } from "../../hooks/auth";
import { Button } from "../button/button";
import * as S from "./styled";


interface IDeleteTask {
  id: number;
  view: boolean;
  onBackdropPress: () => void;
  reloadTasksData: () => void;
}

const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

export const DeleteModal: React.FC<IDeleteTask> = ({
  id: taskId,
  view,
  onBackdropPress,
  reloadTasksData,
}) => {
  const [visible, setVisible] = useState(view);
  const [deleteReason, setDeleteReason] = useState("");
  const { userToken } = useAuth();
  const { id } = decodeJsonWebToken(String(userToken));
  const [disable, setDisable] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
    onBackdropPress();
  };

  const handleDelete = async () => {
    try {
      const reasonId = stringToHash(deleteReason);
      await api.post(`/task/delete/${taskId}/${id}`, {
        deleteMessage: deleteReason,
      });
      toggleOverlay();
      reloadTasksData();
      console.log("Mensagem de exclusão enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar mensagem de exclusão:", error);
    }
  };
  const handleTextChange = (text: string) => {
    text.length > 0 ? setDisable(false)  : setDisable(true);
    setDeleteReason(text);
  };

  return (

    <S.Modal isVisible={visible} onBackdropPress={toggleOverlay} transparent>
        <TouchableOpacity onPress={toggleOverlay} style={S.styles.closeButton} >
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      <View style={S.styles.modalView}>
        <Text style={S.styles.text}>Realmente deseja excluir?</Text>
        <TextInput
          placeholder="Digite o motivo da exclusão"
          value={deleteReason}
          onChangeText={(text) => handleTextChange(text)}
          style={{  borderWidth: 1, borderRadius: 10 , marginBottom: 10, width: "83%", height: 70, paddingLeft: 10, borderColor: "#000"}}
          />  
       <View style={S.styles.buttonView}> 
        <Button
          width={100}
          title="Excluir"
          onPress={handleDelete}
          type="solid"
          borderColor="transparent"
          backgroundColor="#bd1310"
          color="#ffff"
          disable={disable}
          />
      <View style={{ marginLeft: 5 }}>

        <Button
          width={100}
          title="Cancelar"
          onPress={toggleOverlay}
          type="clear"
          borderColor="transparent"
          backgroundColor="transparent"
          color="#000"
          />
          </View>
          </View>

      </View>
    </S.Modal>
  );
};

export default DeleteModal;
