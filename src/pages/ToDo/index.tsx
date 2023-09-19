import React, { useState } from "react";
import { Container, TextStatus1, TextStatus2, TextStatus3 } from "./styled";
import { Cards } from "../../components/cards/cards";
import { SpeedDial } from "@rneui/themed";

export default function ToDo() {
  const [open, setOpen] = useState(false);

      return (
        <Container>
          <TextStatus1>DONE</TextStatus1>
          <Cards task="Tarefa 3473985" descricao="Lorem ipsum dolor sit amet dfreg fgreg dgds" status='warning' value='DONE' statusColor="#ebae11"/>
          
          <TextStatus2>DOING</TextStatus2>
          
          <TextStatus3>TO DO</TextStatus3>
        </Container>
      );
}