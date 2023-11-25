import React, { useState } from "react";
import { Modal, TextInput, TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";
import { decodeJsonWebToken } from "../../utils/utils";
import { useAuth } from "../../hooks/auth";
import { styles } from "./styled"; 

interface IDeleteTask {
  id: number;
  view: boolean;
  onBackdropPress: () => void;
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

export const DeleteModal: React.FC<IDeleteTask> = ({ id: taskId, view, onBackdropPress }) => {
  const [visible, setVisible] = useState(view);
  const [deleteReason, setDeleteReason] = useState('');
  const { userToken } = useAuth();
  const { id } = decodeJsonWebToken(String(userToken));

  const toggleOverlay = () => {
    setVisible(!visible);
    if (onBackdropPress) {
      onBackdropPress();
    }
  };

  const handleDelete = async () => {
    try {
      const reasonId = stringToHash(deleteReason);
      await api.post(`/task/delete/${taskId}/${id}`, {
        deleteMessage: deleteReason,
      });

      await api.delete(`/task/delete/${taskId}/${id}`);
      toggleOverlay();
    } catch (error) {
      console.error("Erro ao enviar mensagem de exclusão:", error);
      toggleOverlay();
    }
  };

  return (
    <Modal visible={visible} onRequestClose={toggleOverlay} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={toggleOverlay} style={styles.closeButton}>
            <Feather name="x" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.text}>Realmente deseja excluir?</Text>
          <TextInput
            placeholder="Digite o motivo da exclusão"
            value={deleteReason}
            onChangeText={(text) => setDeleteReason(text)}
            style={{ borderBottomWidth: 1, marginBottom: 20, width: "70%" }}
          />
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.text}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
