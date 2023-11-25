import { StyleSheet } from "react-native";
import styled from "styled-components";
import { Overlay } from '@rneui/themed';

export const Modal = styled(Overlay)`
  width: 100%;
`;

export const styles = StyleSheet.create({

  modalView: {
    
    backgroundColor: "#fff",
    borderRadius: 5,
    top: "30%",
    padding: 20,
    width: 320,
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 15,
  },
  buttonView: {
    flexDirection: "row",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 15,
  },
  
});

export default styles;
