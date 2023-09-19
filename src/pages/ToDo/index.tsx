import React, { useState } from "react";
import { Container, TextStatus1, TextStatus2, TextStatus3 } from "./styled";
import { Cards } from "../../components/cards/cards";

export default function ToDo() {
  const [open, setOpen] = useState(false);

      return (
        <Container>
          <TextStatus1>DONE</TextStatus1>
          <Cards task="Tarefa 3473985" descricao="Lorem ipsum dolor sit amet dfreg fgreg dgds" status='success' value='DONE' statusColor="#67d207" priority="High" deadline="2023-12-23"/>
          
          <TextStatus2>DOING</TextStatus2>
          
          <TextStatus3>TO DO</TextStatus3>
        </Container>
      );
}