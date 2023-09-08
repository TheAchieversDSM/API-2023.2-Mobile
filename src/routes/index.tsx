import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import jwt_decode from 'jwt-decode'
import { JsonWebToken } from "../interfaces/auth";

export function Routes() {
    const { userToken, signOut } = useAuth();

    useEffect(() => {
        /* @REVIEW - Mudar o metodo de verificação */
        const checkTokenValidity = () => {
            if (userToken) {
                const decodedToken: JsonWebToken = jwt_decode(userToken);
                const { exp } = decodedToken;
                const expireTime = new Date(exp * 1000);
                const timeNow = new Date();
                if (expireTime < timeNow) {
                    signOut()
                }
            }
        };
        checkTokenValidity();
        const intervalId = setInterval(checkTokenValidity, 30 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [userToken]);

    return (
        <NavigationContainer>
            {userToken ? <StackRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
