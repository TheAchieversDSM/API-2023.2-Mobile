import { INotFound } from "../../interfaces/notfound";
import { Container, Message, Progress, MessageDate, MessageTitle, Logo } from "./style";
import React from 'react'
import oracleLogo from "../../assets/oracle.png"

export const NotFound = ({ date }: INotFound) => {
    return (
        <Container>
            <Logo source={oracleLogo} />
            <MessageTitle>Ocorreu um erro inesperado.</MessageTitle>
            <Message>Pedimos desculpas, mas parece que algo deu errado. Nossa equipe já foi notificada sobre o problema e está trabalhando para resolvê-lo o mais rápido possível.</Message>
            <Message>Enquanto isso, a cada 1 minuto, atualizaremos você sobre o progresso da resolução do problema. Pedimos a sua paciência enquanto trabalhamos para solucionar isso.</Message>
            <MessageDate>{date.toLocaleString('pt-BR', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: '2-digit',
            })}</MessageDate>
            <Progress variant="indeterminate" />
        </Container>
    );
}